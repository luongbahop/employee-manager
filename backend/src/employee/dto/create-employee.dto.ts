import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(10)
  first_name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(10)
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsNumber()
  gender: number;
}
