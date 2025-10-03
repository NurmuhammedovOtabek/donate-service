import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Shop } from './models/shop.model';

@Injectable()
export class ShopService {
  constructor(@InjectModel(Shop) private readonly shopModule: typeof Shop) {}

  async create(createShopDto: CreateShopDto) {
    const create = await this.shopModule.create(createShopDto)
    return create
  }

  async findAll() {
    const allShop = await this.shopModule.findAll({include:{all:true}})
    return allShop
  }

  async findByName(name: string) {
    const byName = await this.shopModule.findOne({where:{name}})
    return byName
  }

  async findOne(id: number) {
    const one = await this.shopModule.findByPk(id)
    return one
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    const verfy = await this.findOne(id)
    if(!verfy){
      throw new NotFoundException("Bunday idli malumot yoq")
    }
    const update = await this.shopModule.update(updateShopDto,{
      where:{id},
      returning: true
    })
    return update[1][0]
  }

  async remove(id: number) {
    const verfy = await this.findOne(id);
    if (!verfy) {
      throw new NotFoundException("Bunday idli malumot yoq");
    }
    await this.shopModule.destroy({where:{id}})
    return "Malumot ochrildi"
  }
}
