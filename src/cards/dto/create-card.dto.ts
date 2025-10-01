import { IsEnum, IsInt, IsNotEmpty, IsString, Length, max, Min } from "class-validator"
import { CardType } from "../models/card.model"
import { ApiProperty } from "@nestjs/swagger";

export class CreateCardDto {
  @ApiProperty({
    example: "humo",
    description: "karta turi (uzcard, humo, visa)",
  })
  @IsEnum(CardType)
  @IsNotEmpty()
  card_type: CardType;

  @ApiProperty({
    example: "9999999999999999",
    description: "recipient karta raqami",
  })
  @IsString()
  @Length(16, 16)
  card_number: string;
  @ApiProperty({
    example: "07/27",
    description: "kartani amal qilish mudati",
  })
  @IsString()
  expiry_date: string;

  @ApiProperty({
    example: 1,
    description: "recipient id si",
  })
  @IsInt()
  @Min(1)
  recipientId: number;
}
