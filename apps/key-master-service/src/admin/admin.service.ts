import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKeyDto, UpdateKeyDto } from './dto/admin.dto';
import { Key } from '@app/db/entities';

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
    return this.keyRepository.findOne({ where: { id } });
  }

  async deleteKey(id: number): Promise<void> {
    await this.keyRepository.delete(id);
  }

  async listKeys(): Promise<Key[]> {
    return this.keyRepository.find();
  }

  private generateKey(): string {
    return Math.random().toString(36).substr(2, 16);
  }
}
