import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { RecipientModule } from '../recipient/recipient.module';
import { Recipient } from '../recipient/models/recipient.model';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forFeature([Recipient]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: process.env.SECRET_TIME },
    }),
    AdminModule,
    RecipientModule,
    Recipient,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
