export class CreateKeyDto {
  readonly rateLimit: number;
  readonly expiresAt: Date;
}

export class UpdateKeyDto {
  readonly rateLimit?: number;
  readonly expiresAt?: Date;
  readonly isActive?: boolean;
}
