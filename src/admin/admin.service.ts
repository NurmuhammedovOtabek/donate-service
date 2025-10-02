import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from "bcrypt"

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminModule: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    const verfy = await this.adminModule.findOne({
      where: { email: createAdminDto.email },
    });
    if (verfy) {
      throw new ConflictException("Bu email allaqachon royxatdan otgan");
    }
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);
    createAdminDto.password = hashedPassword;
    const newAdmin = await this.adminModule.create(createAdminDto);
    return newAdmin;
  }

  async findAll() {
    const allAdmin = await this.adminModule.findAll();
    return allAdmin;
  }

  async findOneByEmail(email: string) {
    const admin = await this.adminModule.findOne({ where: { email } });
    return admin;
  }

  async findOne(id: number) {
    const oneAdmin = await this.adminModule.findByPk(id);
    return oneAdmin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const verfy = await this.findOne(id);
    if (!verfy) {
      throw new NotFoundException("Bunday idli admin yoq");
    }
    if (verfy.email != updateAdminDto.email) {
      const verfy = await this.adminModule.findOne({
        where: { email: updateAdminDto.email },
      });
      if (verfy) {
        throw new ConflictException("Bu email allaqachon royxatdan otgan");
      }
    }
    const updateAdmin = this.adminModule.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return updateAdmin[1][0];
  }

  async remove(id: number) {
    const verfy = await this.findOne(id);
    if (!verfy) {
      throw new NotFoundException("Bunday idli admin yoq");
    }
    await this.adminModule.destroy({ where: { id } });
    return "Malumot ochrildi";
  }
}
