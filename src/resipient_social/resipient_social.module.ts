import { Module } from '@nestjs/common';
import { ResipientSocialService } from './resipient_social.service';
import { ResipientSocialController } from './resipient_social.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ResipientSocial } from './models/resipient_social.model';
import { Recipient } from '../recipient/models/recipient.model';
import { SocialMedia } from '../social_media/models/social_media.model';
import { RecipientModule } from '../recipient/recipient.module';
import { SocialMediaModule } from '../social_media/social_media.module';

@Module({
  imports:[SequelizeModule.forFeature([ResipientSocial, Recipient, SocialMedia]), RecipientModule, SocialMediaModule],
  controllers: [ResipientSocialController],
  providers: [ResipientSocialService],
})
export class ResipientSocialModule {}
