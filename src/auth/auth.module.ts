import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { RecipientModule } from '../recipient/recipient.module';
import { Recipient } from '../recipient/models/recipient.model';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../user/user.module';
import { Admin } from '../admin/models/admin.model';
import { User } from '../user/models/user.model';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forFeature([Recipient, Admin, User]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: process.env.SECRET_TIME },
    }),
    AdminModule,
    RecipientModule,
    Recipient,
    UserModule,
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
