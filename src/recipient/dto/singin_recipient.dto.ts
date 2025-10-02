import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SinginRecipientDto {
  @ApiProperty({
    example: "name1@gmail.com",
    description: "Recipient emaili",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    example: "1234",
    description: "Recipient paroli",
  })
  @IsString()
  password: string;
}
