import { IsEnum, IsInt, IsNotEmpty, IsString, Length, max } from "class-validator"
import { CardType } from "../models/card.model"

export class CreateCardDto {
  @IsEnum(CardType)
  @IsNotEmpty()
  card_type: CardType;
  @IsString()
  @Length(16, 16)
  card_number: string;
  @IsString()
  expiry_date: string;
  recipientId: number;
}
