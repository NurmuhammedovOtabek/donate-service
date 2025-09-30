import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipient } from './models/recipient.model';
import { Card } from '../cards/models/card.model';

@Module({
  imports:[SequelizeModule.forFeature([Recipient, Card])],
  controllers: [RecipientController],
  providers: [RecipientService],
  exports:[RecipientService]
})
export class RecipientModule {}
