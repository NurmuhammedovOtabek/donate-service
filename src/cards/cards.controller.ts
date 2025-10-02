import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthRecipientGuard } from '../common/guards/jwt_auth_recipient.guard';
import { JwtAuthAdminGuard } from '../common/guards/jwt_auth_admin.guard';
import { SelfGuard } from '../common/guards/self.guard';

@ApiBearerAuth()
@Controller("cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(JwtAuthRecipientGuard)
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }
  @UseGuards(JwtAuthAdminGuard)
  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @UseGuards(JwtAuthRecipientGuard)
  @Get("recipientId/:recipientId")
  findOneByRecipient(@Param("recipientId") recipientId: number) {
    return this.cardsService.findOneByRecipient(recipientId);
  }
  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthRecipientGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cardsService.findOne(+id);
  }

  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthRecipientGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthRecipientGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cardsService.remove(+id);
  }
}
