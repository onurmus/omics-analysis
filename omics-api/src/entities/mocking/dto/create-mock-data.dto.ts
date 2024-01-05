import {
  IsAlphanumeric,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMockDataDto {
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MaxLength(50)
  experimentName: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(20)
  numberOfSamples: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(50000)
  numberOfGenes: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1)
  wideRangeExpressionRatio?: number = 0.2;
}
