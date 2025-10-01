import { Module } from '@nestjs/common';
import { SocialMediaService } from './social_media.service';
import { SocialMediaController } from './social_media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocialMedia } from './models/social_media.model';
import { ResipientSocial } from '../resipient_social/models/resipient_social.model';

@Module({
  imports:[SequelizeModule.forFeature([SocialMedia, ResipientSocial])],
  controllers: [SocialMediaController],
  providers: [SocialMediaService],
  exports:[SocialMediaService]
})
export class SocialMediaModule {}
