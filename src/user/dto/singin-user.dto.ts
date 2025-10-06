import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class SinginUserDto {
  @ApiProperty({
    example: "man@gmail.com",
    description: " foydalanuvchini emaili",
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: "Man1111",
    description: "foydalanuvchini paroli",
  })
  @IsString()
  @MinLength(4)
  password: string;
}
