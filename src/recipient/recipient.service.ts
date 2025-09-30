import { Injectable } from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Recipient } from './models/recipient.model';
import * as bcrypt from "bcrypt"

@Injectable()
export class RecipientService {
  constructor(
    @InjectModel(Recipient) private readonly recipientModel: typeof Recipient
  ) {}

  async create(createRecipientDto: CreateRecipientDto) {
    const recipient = await this.findOneByEmail(createRecipientDto.email)
    if(!recipient){
      return "Bunda email egasi mavjud"
    }
    const hashedPassword = await bcrypt.hash(createRecipientDto.password, 7)
    createRecipientDto.password = hashedPassword
    const newRecipient = await this.recipientModel.create(createRecipientDto)
    return newRecipient
  }

  async findAll() {
    const allRecipient = await this.recipientModel.findAll({include: {all:true}})
    return allRecipient
  }

  async findOneByEmail(email: string) {
    const recipient = await this.recipientModel.findOne({where: {email}})
    return recipient
  }

  async findOne(id: number) {
    const oneRecipient = await this.recipientModel.findByPk(id)
    return oneRecipient
  }

  async update(id: number, updateRecipientDto: UpdateRecipientDto) {
    const recipient = await this.findOne(id)
    if(!recipient){
      return "Bunday idli recipient yo'q"
    }
    const comperePassword = await bcrypt.compare(updateRecipientDto.password!, recipient.password)
    if(!comperePassword){
    const hashedPassword = await bcrypt.hash(updateRecipientDto.password!, 7)
      updateRecipientDto.password = hashedPassword
    }

    const updateREcipient = await this.recipientModel.update(updateRecipientDto,{
      where:{id},
      returning:true
    })
    return updateREcipient
  }

  async remove(id: number) {
    const recipient = await this.findOne(id)
    if(!recipient){
      return "Bunday recipient yoq"
    }
    await this.recipientModel.destroy({where:{id}})
    return "Malumot ochrildi"
  }
}
