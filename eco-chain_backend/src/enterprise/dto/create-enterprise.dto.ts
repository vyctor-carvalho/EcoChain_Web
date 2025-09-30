import { IsNotEmpty, IsObject, IsString, Length, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAuthLoginDto } from "src/auth-login/dto/create-auth-login.dto";

export class CreateEnterpriseDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres.' })
  @IsNotEmpty()
  name: string;

  @IsString({ message: 'O CNPJ deve ser uma string.' })
  @Length(14, 14, { message: 'O CNPJ deve ter exatamente 14 caracteres.' })
  @IsNotEmpty()
  cnpj: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateAuthLoginDto)
  authLogin: CreateAuthLoginDto;
}