import { IsString, IsDate, IsArray, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  members?: string[];

  @IsOptional()
  settings?: {
    notifications?: boolean;
    autoSave?: boolean;
    theme?: string;
  };

  @IsEnum(['active', 'completed', 'cancelled'])
  @IsOptional()
  status?: string;
} 