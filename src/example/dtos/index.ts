import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum ExampleStatus {
  pending = 1,
  published = 2,
  archived = 3,
}

export class ExampleDTO {
  @MaxLength(75)
  @IsNotEmpty()
  title: string;

  @MaxLength(160)
  @IsOptional()
  description = '';

  @IsOptional()
  content = '';

  @IsEnum(ExampleStatus)
  @IsOptional()
  status: ExampleStatus = ExampleStatus.pending;

  @MinLength(3, { each: true })
  @MaxLength(10, { each: true })
  @ArrayMaxSize(5)
  @IsArray()
  @IsOptional()
  tags: Array<string> = [];

  note = '';
}
