import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    example:"adminman",
    description:"admining full name si"
  })
  @IsString()
  @Length(2,50)
  full_name: string;

  @ApiProperty({
    example:"admin@gmail.com",
    description:"email"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example:"1234",
    description:"Admin paroli"
  })
  @IsString()
  @Length(4,10)
  password: string;
  is_creator: boolean;
  is_active: boolean;
}
