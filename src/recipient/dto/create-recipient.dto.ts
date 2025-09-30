import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateRecipientDto {
  @IsString()
  name: string;
  @IsString()
  full_name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;
  addres: string;
  token: string;
}
