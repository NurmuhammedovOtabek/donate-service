import { Body, Controller, Param, ParseIntPipe, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateRecipientDto } from "../recipient/dto/create-recipient.dto";
import { SinginRecipientDto } from "../recipient/dto/singin_recipient.dto";
import { SinginAdmintDto } from "../admin/dto/singin-admin.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { SinginUserDto } from "../user/dto/singin-user.dto";
import type { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorators";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //recipient
  @Post("singupR")
  singupRecipient(@Body() createRecipientDto: CreateRecipientDto) {
    return this.authService.singupRecipient(createRecipientDto);
  }

  @Post("singinR")
  singinRecipient(
    @Body() siningRecipientDto: SinginRecipientDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singinRecipient(siningRecipientDto, res);
  }

  @Post("logout")
  logoutR(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutRecipient(refreshToken, res);
  }

  @Post(":id/refresh")
  refreshR(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenRecipient(id, refreshToken, res);
  }

  //admin
  @Post("singinA")
  singin(
    @Body() siningAdminDto: SinginAdmintDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singinAdmin(siningAdminDto, res);
  }

  @Post("logout")
  logoutA(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutAdmin(refreshToken, res);
  }

  @Post(":id/refresh")
  refreshA(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenAdmin(id, refreshToken, res);
  }

  //user
  @Post("singupU")
  singupUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.singupUser(createUserDto);
  }

  @Post("singinU")
  singinUser(
    @Body() siningUserDto: SinginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singinuser(siningUserDto, res);
  }

  @Post("logout")
  logoutU(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutUser(refreshToken, res);
  }

  @Post(":id/refresh")
  refreshU(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenUser(id, refreshToken, res);
  }
}
