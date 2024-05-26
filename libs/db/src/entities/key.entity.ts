import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Key {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  key!: string;

  @Column()
  rateLimit!: number;

  @Column()
  expiresAt!: Date;

  @Column({ default: true })
  isActive!: boolean;
}
