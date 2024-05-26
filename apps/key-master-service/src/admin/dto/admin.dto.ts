import { IsInt, Min, IsDateString, IsBoolean } from 'class-validator';

export class CreateKeyDto {
  @IsInt()
  @Min(1)
  readonly rateLimit: number;

  @IsDateString()
  readonly expiresAt: Date;
}

export class UpdateKeyDto {
  @IsInt()
  @Min(1)
  readonly rateLimit: number;

  @IsDateString()
  readonly expiresAt: Date;

  @IsBoolean()
  readonly isActive: boolean;
}
