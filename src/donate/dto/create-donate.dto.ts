import { ApiProperty } from "@nestjs/swagger";

export class CreateDonateDto {
  @ApiProperty({
    example: 1,
    description: "recipient id si",
  })
  recipientId: number;

  @ApiProperty({
    example: 1,
    description: "user id si",
  })
  userId: number;

  @ApiProperty({
    example:"salom",
    description:"izohi"
  })
  notifcation: string;

  @ApiProperty({
    example:true,
    description:"anonim tarzda yuborish yoki yoq"
  })
  is_AnonimPay: boolean;
}
