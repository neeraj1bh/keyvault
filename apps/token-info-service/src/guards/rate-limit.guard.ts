import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ThrottlerGuard,
  ThrottlerException,
  InjectThrottlerOptions,
  InjectThrottlerStorage,
  ThrottlerStorage,
} from '@nestjs/throttler';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { TokenInfoService } from '../token-info-service.service';
import { LoggerService } from '@app/logger';

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  constructor(
    @InjectThrottlerOptions()
    protected readonly options: ThrottlerModuleOptions,
    @InjectThrottlerStorage()
    protected readonly storageService: ThrottlerStorage,
    @Inject(TokenInfoService) private tokenInfoService: TokenInfoService,
    protected readonly reflector: Reflector,
    private readonly logger: LoggerService,
  ) {
    super(options, storageService, reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const apiKey = request.headers['x-api-key'];
      if (!apiKey) {
        throw new ForbiddenException('API key is missing');
      }

      const userKey = await this.tokenInfoService.validateKey(apiKey);
      const { key, rateLimit: limit } = userKey;
      const ttl = 5000;

      const { totalHits } = await this.storageService.increment(key, ttl);
      console.log('limit', limit, 'ttl', ttl, 'totalHits', totalHits);

      if (totalHits > limit) {
        throw new ThrottlerException();
      }
      return true;
    } catch (error) {
      this.logger.error('Rate limit exceeded', error);
      throw error;
    }
  }
}
