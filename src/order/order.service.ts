import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "./models/order.model";
import { UserService } from "../user/user.service";
import { ShopService } from "../shop/shop.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    private readonly userService: UserService,
    private readonly shopService: ShopService
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const verfy = this.shopService.findOne(createOrderDto.shopId);
    if (!verfy) {
      throw new NotFoundException("Bunday shop id yoq");
    }
    const verfy2 = this.userService.findOne(createOrderDto.userId);
    if (!verfy2) {
      throw new NotFoundException("Bunday user id yoq");
    }
    const newOrder = await this.orderModel.create(createOrderDto);
    return newOrder;
  }

  async findAll() {
    const all = await this.orderModel.findAll();
    return all;
  }

  async findOne(id: number) {
    const one = await this.orderModel.findOne({ where: { id } });
    return one;
  }

  async update(id: number, dto: UpdateOrderDto) {
    const verfy = await this.findOne(id);
    if (!verfy) {
      throw new NotFoundException("Bunday shop id yoq");
    }
    if (dto.userId != verfy.userId) {
      const verfyU = this.userService.findOne(dto.userId!);
      if (!verfyU) {
        throw new NotFoundException("Bunday user id yoq");
      }
    }
    if (dto.shopId != verfy.shopId) {
      const verfy = this.shopService.findOne(dto.shopId!);
      if (!verfy) {
        throw new NotFoundException("Bunday shop id yoq");
      }
    }
    const newOrder = await this.orderModel.update(dto,{where:{id}})
    return newOrder
  }

  async remove(id: number) {
    const verfy = await this.findOne(id);
    if (!verfy) {
      throw new NotFoundException("Bunday shop id yoq");
    }
    await this.orderModel.destroy({where:{id}})
    return "ochdi"
  }
}
