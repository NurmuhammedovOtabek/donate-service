import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResipientSocialDto } from './dto/create-resipient_social.dto';
import { UpdateResipientSocialDto } from './dto/update-resipient_social.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ResipientSocial } from './models/resipient_social.model';
import { SocialMediaService } from '../social_media/social_media.service';
import { RecipientService } from '../recipient/recipient.service';

@Injectable()
export class ResipientSocialService {
  constructor(@InjectModel(ResipientSocial) private readonly resipientSocialModel: typeof ResipientSocial,
  private readonly socialmediaModeule: SocialMediaService,
  private readonly recipientModule: RecipientService
  ){}

  async create(createResipientSocialDto: CreateResipientSocialDto) {
    const verfyRecipient = await this.recipientModule.findOne(createResipientSocialDto.pricipentId)
    if(!verfyRecipient){
      throw new NotFoundException("Bunday recipient yoq")
    }
    const varfySocial = await this.socialmediaModeule.findOne(createResipientSocialDto.socialId)
    if(!varfySocial){
      throw new NotFoundException("Bunday social yoq");
    }
    const newRecSocial = await this.resipientSocialModel.create(createResipientSocialDto)
    return newRecSocial
  }

  async findAll() {
    const allSocialR = await this.resipientSocialModel.findAll({include:{all:true}})
    return allSocialR
  }

  async findOne(id: number) {
    const oneRS = await this.resipientSocialModel.findByPk(id)
    return oneRS
  }

  async update(id: number, updateResipientSocialDto: UpdateResipientSocialDto) {
    const verfy = await this.findOne(id)
    if(!verfy){
      throw new NotFoundException("Bunday recipient social yoq")
    }
    if(updateResipientSocialDto.pricipentId != verfy.pricipentId){
       const verfyRecipient = await this.recipientModule.findOne(
         updateResipientSocialDto.pricipentId!
       );
       if (!verfyRecipient) {
         throw new NotFoundException("Bunday recipient yoq");
       }
    }
    if(updateResipientSocialDto.socialId != verfy.socialId){
      const varfySocial = await this.socialmediaModeule.findOne(
        updateResipientSocialDto.socialId!
      );
      if (!varfySocial) {
        throw new NotFoundException("Bunday social yoq");
      }
    }
    const update = await this.resipientSocialModel.update(updateResipientSocialDto,{
      where:{id},
    returning:true
    })
    return update[1][0]
  }

  async remove(id: number) {
    const verfy = await this.findOne(id)
    if(!verfy){
      throw new NotFoundException("Bunday malumot yoq")
    }
    await this.resipientSocialModel.destroy({where:{id}})
    return "Malumot ochrildi"
  }
}
