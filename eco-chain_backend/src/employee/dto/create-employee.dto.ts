import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { CreateAuthLoginDto } from 'src/auth-login/dto/create-auth-login.dto';
import { SystemRoles } from 'src/auth-login/enums/role.enum';


export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsNumber()
  @IsNotEmpty()
  idade: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(SystemRoles)
  role: SystemRoles;

  @ValidateNested()
  @Type(() => CreateAuthLoginDto)
  authLogin: CreateAuthLoginDto;
}