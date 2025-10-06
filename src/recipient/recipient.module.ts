import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipient } from './models/recipient.model';
import { Card } from '../cards/models/card.model';
import { Shop } from '../shop/models/shop.model';
import { ResipientSocial } from '../resipient_social/models/resipient_social.model';
import { Donate } from '../donate/models/donate.model';

@Module({
  imports:[SequelizeModule.forFeature([Recipient, Card, Shop, ResipientSocial, Donate])],
  controllers: [RecipientController],
  providers: [RecipientService],
  exports:[RecipientService]
})
export class RecipientModule {}
