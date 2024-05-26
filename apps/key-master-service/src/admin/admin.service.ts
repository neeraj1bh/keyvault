import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Key } from '../../../../libs/db/src/entities/key.entity';
import { CreateKeyDto, UpdateKeyDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Key)
    private keyRepository: Repository<Key>,
  ) {}

  async createKey(createKeyDto: CreateKeyDto): Promise<Key> {
    const key = this.keyRepository.create({
      ...createKeyDto,
      key: this.generateKey(),
    });
    return this.keyRepository.save(key);
  }

  async updateKey(id: number, updateKeyDto: UpdateKeyDto): Promise<Key> {
    await this.keyRepository.update(id, updateKeyDto);
    return this.keyRepository.findOne(id);
  }

  async deleteKey(id: number): Promise<void> {
    await this.keyRepository.delete(id);
  }

  async listKeys(): Promise<Key[]> {
    return this.keyRepository.find();
  }

  private generateKey(): string {
    return Math.random().toString(36).substr(2, 16); // Simple random key generation
  }
}
