import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateRecipientDto {
  @ApiProperty({
    example: "name1",
    description: "Recipient ismi",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "name1 fill_name",
    description: "Recipient toliq ismi",
  })
  @IsString()
  full_name: string;

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

  @ApiProperty({
    example: "toshkent",
    description: "Recipient manzili",
  })
  @IsString()
  addres: string;
  token: string;
}
