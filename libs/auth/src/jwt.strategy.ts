import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const audience = this.configService.get<string>('JWT_AUDIENCE');
    if (payload.aud !== audience) {
      throw new UnauthorizedException('Invalid audience');
    }

    // Additional validation logic for issuer, subject, etc.

    return { userId: payload.sub, username: payload.username };
  }
}
