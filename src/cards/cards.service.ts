import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './models/card.model';
import { RecipientService } from '../recipient/recipient.service';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card) private readonly cardModel: typeof Card,
  private readonly recipientService: RecipientService
){}

  async create(createCardDto: CreateCardDto) {
    const verfy = await this.recipientService.findOne(createCardDto.recipientId)
    if(!verfy){
      return "Bunday recipient mavjud emas"
    }
    const newCard = await this.cardModel.create(createCardDto)
    return newCard
  }

  async findAll() {
    const allCsrds = await this.cardModel.findAll({include:{all:true}})
    return allCsrds
  }

  async findOneByRecipient(recipientId:number){
    const verfy = await this.recipientService.findOne(recipientId)
    if(!verfy){
      return "Bunday recipient yoq"
    }
    const cards = await this.cardModel.findAll({where:{recipientId}})
    return cards
  }

  async findOne(id: number) {
    const oneCard = await this.cardModel.findByPk(id)
    return oneCard
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const varfy = await this.findOne(id)
    if(!varfy){
      return "Bunday idli acrd yoq"
    }
    if(varfy.recipientId !== updateCardDto.recipientId){
      const verfy2 = await this.recipientService.findOne(updateCardDto.recipientId!)
      if(!verfy2){
        return "bunda recipient yoq"
      }
    }
    const newCard = await this.cardModel.update(updateCardDto,{
      where:{id},
      returning: true
    })
    return newCard
  }

  async remove(id: number) {
    const verfy = await this.findOne(id)
    if (!verfy) {
      return "Bunday idli acrd yoq";
    }
    await this.cardModel.destroy({where:{id}})
    return `${id} idli card ochrildi`
  }
}
