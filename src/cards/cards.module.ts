import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from './models/card.model';
import { Recipient } from '../recipient/models/recipient.model';
import { RecipientModule } from '../recipient/recipient.module';

@Module({
  imports:[SequelizeModule.forFeature([Card, Recipient]), RecipientModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
