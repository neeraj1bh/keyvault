import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Key {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  key!: string;

  @Column()
  rateLimit!: number;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt!: Date;

  @Column({ default: true })
  isActive!: boolean;
}
