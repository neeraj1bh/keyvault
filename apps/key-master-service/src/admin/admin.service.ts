import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKeyDto, UpdateKeyDto } from './dto/admin.dto';
import { Key } from '@app/db/entities';
import { randomBytes } from 'crypto';
import { LoggerService } from '@app/logger';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Key)
    private keyRepository: Repository<Key>,
    private readonly logger: LoggerService,
  ) {}

  APP_CONTEXT = 'AdminService';

  async createKey(createKeyDto: CreateKeyDto): Promise<Key> {
    try {
      const key = this.keyRepository.create({
        ...createKeyDto,
        key: this.generateKey(),
      });
      return this.keyRepository.save(key);
    } catch (error) {
      this.logger.error('Error creating key:', error, this.APP_CONTEXT);
      throw error;
    }
  }

  async updateKey(key: string, updateKeyDto: UpdateKeyDto): Promise<Key> {
    try {
      console.log('updateKeyDto', updateKeyDto, 'key', key);
      await this.keyRepository.update({ key }, updateKeyDto);
      return this.keyRepository.findOne({ where: { key } });
    } catch (error) {
      this.logger.error('Error updating key:', error, this.APP_CONTEXT);
      throw error;
    }
  }

  async deleteKey(key: string): Promise<void> {
    try {
      await this.keyRepository.delete({ key });
    } catch (error) {
      this.logger.error('Error deleting key:', error, this.APP_CONTEXT);
      throw error;
    }
  }

  async listKeys(): Promise<Key[]> {
    try {
      return this.keyRepository.find();
    } catch (error) {
      this.logger.error('Error listing keys:', error, this.APP_CONTEXT);
      throw error;
    }
  }

  private generateKey(): string {
    try {
      const randomBytesBuffer = randomBytes(8);
      return randomBytesBuffer.toString('hex');
    } catch (error) {
      this.logger.error('Error generating key:', error, this.APP_CONTEXT);
      return '';
    }
  }
}
