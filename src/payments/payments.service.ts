import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment) private readonly paymentModel: typeof Payment){}

  async create(createPaymentDto: CreatePaymentDto) {
    const pay = await this.paymentModel.create(createPaymentDto)
    return pay
  }

  async findAll() {
    const all = await this.paymentModel.findAll()
    return all
  }

  async findOne(id: number) {
    const one = await this.paymentModel.findOne({where:{id}})
    return one
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const update = await this.paymentModel.update(updatePaymentDto,{where:{id}})
    return update
  }

 async  remove(id: number) {
    await this.paymentModel.destroy({where:{id}})
    return "Ochdi"
  }
}
