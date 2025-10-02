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

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly recipientService: RecipientService,
    @InjectModel(Recipient)
    private readonly recipientModel: typeof Recipient,
    private readonly jwtService: JwtService
  ) {}

  private async genereteTokenR(recipient: Recipient) {
    const paylod = {
      id: recipient.id,
      email: recipient.email,
      full_name: recipient.full_name,
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
}
