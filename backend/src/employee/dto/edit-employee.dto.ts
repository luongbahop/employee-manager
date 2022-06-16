import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEnum,
  IsArray,
  IsOptional,
  IsNumber,
  IsEmail,
} from 'class-validator';

export class EditEmployeeDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsNumber()
  gender: number;
}
