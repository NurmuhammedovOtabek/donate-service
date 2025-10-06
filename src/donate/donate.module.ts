import { Module } from '@nestjs/common';
import { DonateService } from './donate.service';
import { DonateController } from './donate.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Donate } from './models/donate.model';
import { User } from '../user/models/user.model';
import { Recipient } from '../recipient/models/recipient.model';
import { RecipientModule } from '../recipient/recipient.module';
import { UserModule } from '../user/user.module';

@Module({
  imports:[SequelizeModule.forFeature([Donate, User, Recipient]), RecipientModule, UserModule],
  controllers: [DonateController],
  providers: [DonateService],
})
export class DonateModule {}
