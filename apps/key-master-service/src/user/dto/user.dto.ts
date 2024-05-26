import { IsString } from 'class-validator';

export class QueryKeyDto {
  @IsString()
  readonly key: string;
}
