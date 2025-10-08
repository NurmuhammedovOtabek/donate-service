import { Module } from '@nestjs/common';
import { RecipientModule } from './recipient/recipient.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardsModule } from './cards/cards.module';
import { SocialMediaModule } from './social_media/social_media.module';
import { ResipientSocialModule } from './resipient_social/resipient_social.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { DonateModule } from './donate/donate.module';
import { PaymentsModule } from './payments/payments.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      autoLoadModels:true,
      logging: false,
      sync: {alter:true}
    }),
    RecipientModule,
    CardsModule,
    SocialMediaModule,
    ResipientSocialModule,
    AdminModule,
    AuthModule,
    ShopModule,
    CategoryModule,
    OrderModule,
    UserModule,
    DonateModule,
    PaymentsModule,
    MailModule
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule {}
