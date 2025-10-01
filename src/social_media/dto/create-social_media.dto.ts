import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSocialMediaDto {
  @ApiProperty({
    example: "You Tube",
    description: "Ijtimoiy tarmoq manzili",
  })
  @IsString()
  social_media: string;

  @ApiProperty({
    example: "YouTube.jpg",
    description: "Ijtimoiy tarmoq rasmi",
  })
  @IsString()
  iconic_url: string;
}
