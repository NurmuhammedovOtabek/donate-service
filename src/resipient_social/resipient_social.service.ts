import { Injectable } from '@nestjs/common';
import { CreateResipientSocialDto } from './dto/create-resipient_social.dto';
import { UpdateResipientSocialDto } from './dto/update-resipient_social.dto';

@Injectable()
export class ResipientSocialService {
  create(createResipientSocialDto: CreateResipientSocialDto) {
    return 'This action adds a new resipientSocial';
  }

  findAll() {
    return `This action returns all resipientSocial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resipientSocial`;
  }

  update(id: number, updateResipientSocialDto: UpdateResipientSocialDto) {
    return `This action updates a #${id} resipientSocial`;
  }

  remove(id: number) {
    return `This action removes a #${id} resipientSocial`;
  }
}
