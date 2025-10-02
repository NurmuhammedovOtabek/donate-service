import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRecipientDto } from '../recipient/dto/create-recipient.dto';
import { SinginRecipientDto } from '../recipient/dto/singin_recipient.dto';
import { SinginAdmintDto } from '../admin/dto/singin-admin.dto';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("singupR")
  singupRecipient(@Body() createRecipientDto: CreateRecipientDto) {
    return this.authService.singupRecipient(createRecipientDto);
  }

  @Post("singinR")
  singinRecipient(@Body() siningRecipientDto: SinginRecipientDto) {
    return this.authService.singinRecipient(siningRecipientDto);
  }

  @Post("singinA")
  singin(@Body() siningAdminDto: SinginAdmintDto) {
    return this.authService.singinAdmin(siningAdminDto);
  }
}
