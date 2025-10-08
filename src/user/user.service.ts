import { BadRequestException, ConflictException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from "bcrypt"
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModels: typeof User,
    private readonly mailService: MailService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userModels.create({
      ...createUserDto,
      password: hashedPassword,
    });
    try {
      await this.mailService.sendMailUser(newUser);
    } catch (error) {
      throw new ServiceUnavailableException("Emailga hat yuboshirda xatolik");
    }

    return { newUser, message: "emailga activation link jonatildi" };
  }

  async findAll() {
    const allUser = await this.userModels.findAll({ include: { all: true } });
    return allUser;
  }

  async findOneByEmail(email: string) {
    const oneUser = await this.userModels.findOne({ where: { email } });
    return oneUser;
  }

  async findOne(id: number) {
    const oneUser = await this.userModels.findOne({ where: { id } });
    return oneUser;
  }

  async update(id: number, dto: UpdateUserDto) {
    const verfyI = await this.findOne(id);
    if (!verfyI) {
      throw new NotFoundException("bunday id yoq");
    }
    if (verfyI.email != dto.email) {
      const verfyE = await this.findOneByEmail(dto.email!);
      if (verfyE) {
        throw new ConflictException("bunday email mavjud");
      }
    }
    const vp = await bcrypt.compare(dto.password!, verfyI.password);
    if (!vp) {
      dto.password = await bcrypt.hash(dto.password!, 7);
    }
    const update = await this.userModels.update(dto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  async remove(id: number) {
    const verfyI = await this.findOne(id);
    if (!verfyI) {
      throw new NotFoundException("bunday id yoq");
    }
    await this.userModels.destroy({ where: { id } });
    return "Malumot ichrildi";
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updateUser = await this.userModels.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );
    if (!updateUser[1][0]) {
      throw new BadRequestException("User already activetes");
    }
    return {
      message: "User activated successFully",
      is_active: updateUser[1][0].is_active,
    };
  }
}
