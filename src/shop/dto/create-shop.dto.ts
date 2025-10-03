import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Length } from "class-validator";

export class CreateShopDto {
  @ApiProperty({
    example: "hudi",
    description: "nomi",
  })
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    example: 10,
    description: "soni",
  })
  @IsInt()
  count: number;

  @ApiProperty({
    example: 100000,
    description: "soni",
  })
  @IsInt()
  price: number;

  @ApiProperty({
    example: "nmadur",
    description: "mahsulot haqida malumot",
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: "qora nangli issiq hudi",
    description: "tarif",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 1,
    description: "recipient idsi",
  })
  @IsInt()
  recipientId: number;

  @ApiProperty({
    example: 1,
    description: "category idsi",
  })
  @IsInt()
  categoryId: number;
}
