import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "Man manov",
    description: "toliq ismi",
  })
  @IsString()
  @Length(2, 50)
  full_name: string;
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
  @ApiProperty({
    example: "9999999999999999",
    description: "foydalanuvchini karta raqami",
  })
  @IsString()
  @Length(16,16)
  card_number: string;
}
