import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonateDto } from './dto/create-donate.dto';
import { UpdateDonateDto } from './dto/update-donate.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Donate } from './models/donate.model';
import { UserService } from '../user/user.service';
import { RecipientService } from '../recipient/recipient.service';

@Injectable()
export class DonateService {
  constructor(@InjectModel(Donate) private readonly donateModel: typeof Donate,
  private readonly userService: UserService,
  private readonly recipientService: RecipientService
  ){}

  async create(createDonateDto: CreateDonateDto) {
    const verfy1 = await this.userService.findOne(createDonateDto.userId)
    if(!verfy1){
      throw new NotFoundException("Bunday user yoq")
    }
    const verfy2 = await this.recipientService.findOne(createDonateDto.recipientId);
    if (!verfy2) {
      throw new NotFoundException("Bunday recipient yoq");
    }
    const donate = await this.donateModel.create(createDonateDto)
    return donate
  }

  async findAll() {
    const all = await this.donateModel.findAll()
    return all
  }

  async findOne(id: number) {
    const one = await this.donateModel.findOne({where:{id}})
    return one
  }

  async update(id: number, updateDonateDto: UpdateDonateDto) {
    const verfy = await this.findOne(id)
    if(!verfy){
      throw new NotFoundException("Bunday donate yoq");
    }
    if(verfy.userId != updateDonateDto.userId){
       const verfy1 = await this.userService.findOne(updateDonateDto.userId!);
       if (!verfy1) {
         throw new NotFoundException("Bunday user yoq");
       }
    }
    if(verfy.recipientId != updateDonateDto.recipientId){
      const verfy2 = await this.recipientService.findOne(
        updateDonateDto.recipientId!
      );
      if (!verfy2) {
        throw new NotFoundException("Bunday recipient yoq");
      }
    }

    const donate = await this.donateModel.update(updateDonateDto,{
      where:{id},
      returning:true
    })
    return donate
  }

  async remove(id: number) {
   const verfy = await this.findOne(id);
   if (!verfy) {
     throw new NotFoundException("Bunday donate yoq");
   }
   await this.donateModel.destroy({where:{id}})
   return "Ochrildi"
  }
}
