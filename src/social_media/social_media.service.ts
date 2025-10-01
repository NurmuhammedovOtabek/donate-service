import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSocialMediaDto } from './dto/create-social_media.dto';
import { UpdateSocialMediaDto } from './dto/update-social_media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SocialMedia } from './models/social_media.model';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectModel(SocialMedia) private readonly socialMediaModula: typeof SocialMedia
  ){}

  async create(createSocialMediaDto: CreateSocialMediaDto) {
   const verify = await this.socialMediaModula.findOne({
     where: { social_media: createSocialMediaDto.social_media},
   });
   if(!verify){
    throw new ConflictException('Bu social media mavjud')
   }
   const newSocial = await this.socialMediaModula.create(createSocialMediaDto)
   return newSocial
  }

  async findAll() {
   const allSocial = await this.socialMediaModula.findAll({include:{all:true}})
   return allSocial
  }

  async findOne(id: number) {
    const oneSocial = await this.socialMediaModula.findByPk(id)
    return oneSocial
  }

  async update(id: number, updateSocialMediaDto: UpdateSocialMediaDto) {
    const verfy = await this.findOne(id)
    if(!verfy){
      throw new NotFoundException("Bunday social media yoq")
    }
    if(verfy.social_media != updateSocialMediaDto.social_media){
      const verify = await this.socialMediaModula.findOne({
        where: { social_media: updateSocialMediaDto.social_media },
      });
      if (!verify) {
        throw new ConflictException("Bu social media mavjud");
      }
    }

    const newSocial = await this.socialMediaModula.update(updateSocialMediaDto,{where:{id}})
    return newSocial
  }

  async remove(id: number) {
    const verfy = await this.findOne(id);
    if (!verfy) {
      throw new NotFoundException("Bunday social media yoq");
    }
    await this.socialMediaModula.destroy({where:{id}})
    return "Malumot ochrildi"
  }
}
