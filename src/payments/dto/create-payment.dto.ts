import { ApiProperty } from "@nestjs/swagger";
import { Payment_method, PStatus } from "../models/payment.model";

export class CreatePaymentDto {
  @ApiProperty({
    example: 1,
  })
  userId: number;

  @ApiProperty({
    example: 1,
  })
  donateId: number;
  
  @ApiProperty({
    example: 1,
  })
  orderId: number;

  @ApiProperty({
    example: "uzum",
  })
  payment_method: Payment_method;

  @ApiProperty({
    example: "success",
  })
  status: PStatus;
  @ApiProperty({
    example:1
  })
  amount: number;
  @ApiProperty({
    example:"2025-01-01"
  })
  payment_date: Date;
}
