import { PartialType } from '@nestjs/swagger';
import { CreateResipientSocialDto } from './create-resipient_social.dto';

export class UpdateResipientSocialDto extends PartialType(CreateResipientSocialDto) {}
