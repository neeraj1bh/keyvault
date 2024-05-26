import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '../../../../.env') });

const configService = new ConfigService();

const dataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [join(__dirname, 'entities', '*.entity{.js,.ts}')],
  migrations: [join(__dirname, 'migrations', '*{.js,.ts}')],
  synchronize: false,
});

export default dataSource;
