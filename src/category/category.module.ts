import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { Shop } from '../shop/models/shop.model';

@Module({
  imports:[SequelizeModule.forFeature([Category, Shop])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
