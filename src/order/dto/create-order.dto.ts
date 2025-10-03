import { ApiProperty } from "@nestjs/swagger";
import { Status } from "../models/order.model";
import { IsInt, IsString, Min, MinLength } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({
    example: "Hadra",
    description: "joylashuvi",
  })
  @IsString()
  @MinLength(5)
  locatin: string;

  @ApiProperty({
    example: 1,
    description: "user id si",
  })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    example: 1,
    description: "shop id si",
  })
  @IsInt()
  @Min(1)
  shopId: number;

  @ApiProperty({
    example: "in_progress",
    description: "statusi(cancelled,completed,in_progress)",
  })
  @IsInt()
  @Min(1)
  status: Status;

  @ApiProperty({
    example: 2,
    description: "miqdori",
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
