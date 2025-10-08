import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { RecipientService } from "../recipient/recipient.service";
import { Recipient } from "../recipient/models/recipient.model";
import { CreateRecipientDto } from "../recipient/dto/create-recipient.dto";
import { SinginRecipientDto } from "../recipient/dto/singin_recipient.dto";
import { SinginAdmintDto } from "../admin/dto/singin-admin.dto";
import { Admin } from "../admin/models/admin.model";
import { InjectModel } from "@nestjs/sequelize";
import { UserService } from "../user/user.service";
import { User } from "../user/models/user.model";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { SinginUserDto } from "../user/dto/singin-user.dto";
import type { Response } from "express";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly recipientService: RecipientService,
    @InjectModel(Recipient)
    private readonly recipientModel: typeof Recipient,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  private async genereteTokenR(recipient: Recipient) {
    const paylod = {
      id: recipient.id,
      email: recipient.email,
      full_name: recipient.full_name,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(paylod, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(paylod, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }
  private async genereteTokenU(user: User) {
    const paylod = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
    };

    const [accessToken, refreshtToken] = await Promise.all([
      this.jwtService.sign(paylod, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(paylod, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshtToken };
  }

  private async genereteTokenA(admin: Admin) {
    const paylod = {
      id: admin.id,
      email: admin.email,
      full_name: admin.full_name,
    };

    const [accessToken, refreshtToken] = await Promise.all([
      this.jwtService.sign(paylod, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(paylod, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshtToken };
  }

  // Recipient
  async singupRecipient(createRecipientDto: CreateRecipientDto) {
    const verfy = await this.recipientService.findOneByEmail(
      createRecipientDto.email
    );
    if (verfy) {
      throw new ConflictException("Bu email allaqachon royxatdan otgan");
    }
    const hashedPassword = await bcrypt.hash(createRecipientDto.password, 7);
    createRecipientDto.password = hashedPassword;
    const newRecipient = await this.recipientModel.create(createRecipientDto);
    try {
      await this.mailService.sendMailRecipient(newRecipient);
    } catch (error) {
      throw new ServiceUnavailableException("Emailga hat yuboshirda xatolik");
    }

    return { newRecipient, message: "emailga activation link jonatildi" };
  }

  async singinRecipient(singinRecipientDto: SinginRecipientDto, res: Response) {
    const recipient = await this.recipientService.findOneByEmail(
      singinRecipientDto.email
    );
    if (!recipient) {
      throw new UnauthorizedException("Email yoki parol notog'ri");
    }
    const comperePassword = await bcrypt.compare(
      singinRecipientDto.password,
      recipient.password
    );
    if (!comperePassword) {
      throw new UnauthorizedException("Email yoki parol notog'ri");
    }

    const { accessToken, refreshToken } = await this.genereteTokenR(recipient);

    recipient.token = await bcrypt.hash(refreshToken, 7);
    recipient.save();

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Hush kelibsiz",
      id: recipient.id,
      accessToken,
    };
  }

  async logoutRecipient(refreshToken: string, res: Response) {
    const adminDate = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_sECTER_KEy,
    });
    if (!adminDate) {
      throw new ForbiddenException("admin not varified");
    }
    const admin = await this.adminService.findOne(adminDate.id);
    if (!admin) {
      throw new BadRequestException("Notog'ri token");
    }
    admin.token = "";
    await admin.save();

    res.clearCookie("refreshToken");
    return {
      message: "admin Loged out",
    };
  }

  async refreshTokenRecipient(
    adminId: number,
    refresh_token: string,
    res: Response
  ) {
    const decodToken = await this.jwtService.decode(refresh_token);

    if (adminId !== decodToken["id"]) {
      throw new ForbiddenException("Ruxsat erilmagan id");
    }
    const admin = await this.adminService.findOne(adminId);

    if (!admin || !admin.token) {
      throw new ForbiddenException("Foribbden");
    }

    const { accessToken, refreshtToken } = await this.genereteTokenA(admin);
    admin.token = await bcrypt.hash(refreshtToken, 7);
    await admin.save();

    res.cookie("refreshToken", refreshtToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return {
      message: "admin refreshed",
      adminId: admin.id,
      accessToken,
    };
  }

  //Admin
  async singinAdmin(singinAdminDto: SinginAdmintDto, res: Response) {
    const admin = await this.adminService.findOneByEmail(singinAdminDto.email);
    if (!admin) {
      throw new UnauthorizedException("Email yoki parol notog'ri");
    }
    const comperePassword = await bcrypt.compare(
      singinAdminDto.password,
      admin.password
    );
    if (!comperePassword) {
      throw new UnauthorizedException("Email yoki parol notog'ri");
    }

    const { accessToken, refreshtToken } = await this.genereteTokenA(admin);
    admin.token = await bcrypt.hash(refreshtToken, 7);
    admin.save();

    res.cookie("refresh_token", refreshtToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Hush kelibsiz",
      id: admin.id,
      accessToken,
    };
  }

  async logoutAdmin(refreshToken: string, res: Response) {
    const recipientDate = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_sECTER_KEy,
    });
    if (!recipientDate) {
      throw new ForbiddenException("Recipient not varified");
    }
    const recipient = await this.recipientService.findOne(recipientDate.id);
    if (!recipient) {
      throw new BadRequestException("Notog'ri token");
    }
    recipient.token = "";
    await recipient.save();

    res.clearCookie("refreshToken");
    return {
      message: "Recipient Loged out",
    };
  }

  async refreshTokenAdmin(
    recipientId: number,
    refresh_token: string,
    res: Response
  ) {
    const decodToken = await this.jwtService.decode(refresh_token);

    if (recipientId !== decodToken["id"]) {
      throw new ForbiddenException("Ruxsat erilmagan id");
    }
    const recipient = await this.recipientService.findOne(recipientId);

    if (!recipient || !recipient.token) {
      throw new ForbiddenException("Foribbden");
    }

    const { accessToken, refreshToken } = await this.genereteTokenR(recipient);
    recipient.token = await bcrypt.hash(refreshToken, 7);
    await recipient.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return {
      message: "recipient refreshed",
      recipientId: recipient.id,
      accessToken,
    };
  }

  
  //user
  async singupUser(createUsertDto: CreateUserDto) {
    const verfy = await this.userService.findOneByEmail(createUsertDto.email);
    if (verfy) {
      throw new ConflictException("Bu email allaqachon royxatdan otgan");
    }
    const newUser = await this.userService.create(createUsertDto);
    return newUser;
  }

  async singinuser(singinuserDto: SinginUserDto, res: Response) {
    const user = await this.userService.findOneByEmail(singinuserDto.email);
    if (!user) {
      throw new UnauthorizedException("Email yoki parol notog'ri");
    }
    const comperePassword = await bcrypt.compare(
      singinuserDto.password,
      user.password
    );
    if (!comperePassword) {
      throw new UnauthorizedException("Email yoki parol notog'ri");
    }

    const { accessToken, refreshtToken } = await this.genereteTokenU(user);
    user.token = await bcrypt.hash(refreshtToken, 7);
    await user.save();

    res.cookie("refresh_token", refreshtToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Hush kelibsiz",
      id: user.id,
      accessToken,
    };
  }

  async logoutUser(refreshToken: string, res: Response) {
    const userDate = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_sECTER_KEy,
    });
    if (!userDate) {
      throw new ForbiddenException("user not varified");
    }
    const user = await this.userService.findOne(userDate.id);
    if (!user) {
      throw new BadRequestException("Notog'ri token");
    }
    user.token = "";
    await user.save();

    res.clearCookie("refreshToken");
    return {
      message: "user Loged out",
    };
  }

  async refreshTokenUser(
    userId: number,
    refresh_token: string,
    res: Response
  ) {
    const decodToken = await this.jwtService.decode(refresh_token);

    if (userId !== decodToken["id"]) {
      throw new ForbiddenException("Ruxsat erilmagan id");
    }
    const user = await this.userService.findOne(userId);

    if (!user || !user.token) {
      throw new ForbiddenException("Foribbden");
    }

    const { accessToken, refreshtToken } = await this.genereteTokenU(user);
    user.token = await bcrypt.hash(refreshtToken, 7);
    await user.save();

    res.cookie("refreshToken", refreshtToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return {
      message: "user refreshed",
      userId: user.id,
      accessToken,
    };
  }
}
