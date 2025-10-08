import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Order } from '../order/models/order.model';
import { Donate } from '../donate/models/donate.model';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[SequelizeModule.forFeature([User, Order, Donate]), MailModule],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
