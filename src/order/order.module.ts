import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { UserModule } from '../user/user.module';
import { ShopModule } from '../shop/shop.module';

@Module({
  imports:[SequelizeModule.forFeature([Order]), UserModule, ShopModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
