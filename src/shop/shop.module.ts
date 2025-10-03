import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shop } from './models/shop.model';
import { Recipient } from '../recipient/models/recipient.model';
import { Category } from '../category/models/category.model';
import { Order } from '../order/models/order.model';

@Module({
  imports:[SequelizeModule.forFeature([Shop, Recipient, Category, Order])],
  controllers: [ShopController],
  providers: [ShopService],
  exports:[ShopService]
})
export class ShopModule {}
