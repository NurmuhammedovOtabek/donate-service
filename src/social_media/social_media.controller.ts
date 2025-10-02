import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SocialMediaService } from './social_media.service';
import { CreateSocialMediaDto } from './dto/create-social_media.dto';
import { UpdateSocialMediaDto } from './dto/update-social_media.dto';
import { JwtAuthAdminGuard } from '../common/guards/jwt_auth_admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthRecipientGuard } from '../common/guards/jwt_auth_recipient.guard';

@ApiBearerAuth()
@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Post()
  create(@Body() createSocialMediaDto: CreateSocialMediaDto) {
    return this.socialMediaService.create(createSocialMediaDto);
  }


  @UseGuards(JwtAuthRecipientGuard)
  @Get()
  findAll() {
    return this.socialMediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialMediaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialMediaDto: UpdateSocialMediaDto) {
    return this.socialMediaService.update(+id, updateSocialMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialMediaService.remove(+id);
  }
}
