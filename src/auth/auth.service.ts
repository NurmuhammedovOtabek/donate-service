import {
  ConflictException,
  Injectable,
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

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly recipientService: RecipientService,
    @InjectModel(Recipient)
    private readonly recipientModel: typeof Recipient,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  private async genereteTokenR(recipient: Recipient) {
    const paylod = {
      id: recipient.id,
      email: recipient.email,
      full_name: recipient.full_name,
    };
    return { token: this.jwtService.sign(paylod) };
  }
  private async genereteTokenU(user: User) {
    const paylod = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
    };
    return { token: this.jwtService.sign(paylod) };
  }

  private async genereteTokenA(admin: Admin) {
    const paylod = {
      id: admin.id,
      email: admin.email,
      full_name: admin.full_name,
    };
    return { token: this.jwtService.sign(paylod) };
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
    return newRecipient;
  }

  async singinRecipient(singinRecipientDto: SinginRecipientDto) {
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

    return this.genereteTokenR(recipient);
  }

  //Admin
  async singinAdmin(singinAdminDto: SinginAdmintDto) {
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

    return this.genereteTokenA(admin);
  }


  //user
  async singupUser(createUsertDto: CreateUserDto) {
    const verfy = await this.userService.findOneByEmail(createUsertDto.email);
    if (verfy) {
      throw new ConflictException("Bu email allaqachon royxatdan otgan");
    }
    const newUsert = await this.userService.create(createUsertDto);
    return newUsert;
  }

  async singinuser(singinuserDto: SinginUserDto) {
    const user = await this.userService.findOneByEmail(
      singinuserDto.email
    );
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

    return this.genereteTokenU(user);
  }
}
