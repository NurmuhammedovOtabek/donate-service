import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class SinginAdmintDto {
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
}
