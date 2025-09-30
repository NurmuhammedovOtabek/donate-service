import { Module } from '@nestjs/common';
import { ResipientSocialService } from './resipient_social.service';
import { ResipientSocialController } from './resipient_social.controller';

@Module({
  controllers: [ResipientSocialController],
  providers: [ResipientSocialService],
})
export class ResipientSocialModule {}
