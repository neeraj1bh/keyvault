import { Key } from '@app/db/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Key)
    private keyRepository: Repository<Key>,
  ) {}

  async getKeyDetails(key: string): Promise<Key> {
    return this.keyRepository.findOne({ where: { key, isActive: true } });
  }

  async disableKey(key: string): Promise<Key> {
    const keyEntity = await this.keyRepository.findOne({ where: { key } });
    keyEntity.isActive = false;
    return this.keyRepository.save(keyEntity);
  }
}
