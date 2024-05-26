import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DbConfigService } from './db.service';
import { Key } from './entities/key.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/libs/db/.env`,
    }),
  ],
  providers: [DbConfigService],
  exports: [DbConfigService],
})
export class DbModule {
  static forRoot(): DynamicModule {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useClass: DbConfigService,
        }),
      ],
    };
  }

  static forFeature(entities = [Key]): DynamicModule {
    return {
      module: DbModule,
      imports: [TypeOrmModule.forFeature(entities)],
    };
  }
}
