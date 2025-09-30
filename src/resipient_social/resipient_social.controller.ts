import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResipientSocialService } from './resipient_social.service';
import { CreateResipientSocialDto } from './dto/create-resipient_social.dto';
import { UpdateResipientSocialDto } from './dto/update-resipient_social.dto';

@Controller('resipient-social')
export class ResipientSocialController {
  constructor(private readonly resipientSocialService: ResipientSocialService) {}

  @Post()
  create(@Body() createResipientSocialDto: CreateResipientSocialDto) {
    return this.resipientSocialService.create(createResipientSocialDto);
  }

  @Get()
  findAll() {
    return this.resipientSocialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resipientSocialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResipientSocialDto: UpdateResipientSocialDto) {
    return this.resipientSocialService.update(+id, updateResipientSocialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resipientSocialService.remove(+id);
  }
}
