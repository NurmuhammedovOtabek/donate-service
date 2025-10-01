import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Min } from "class-validator";

export class CreateResipientSocialDto {
  @ApiProperty({
    example: 1,
    description: "Social media id si",
  })
  @IsInt()
  @Min(1)
  socialId: number;

  @ApiProperty({
    example: 1,
    description: "pricipent id si",
  })
  @IsInt()
  @Min(1)
  pricipentId: number;

  @ApiProperty({
    example: "https://www.youtube.com/example",
    description:"Ijtimoiy tarmoq manzili"
  })
  @IsString()
  social_url: string;
}
