import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from "bcrypt"
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModels: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userModels.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser;
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
    const verfyI = await this.findOne(id)
    if(!verfyI){
      throw new NotFoundException('bunday id yoq')
    }
    if(verfyI.email != dto.email){
      const verfyE = await this.findOneByEmail(dto.email!)
      if(verfyE){
        throw new ConflictException('bunday email mavjud')
      }
    }
    const vp = await bcrypt.compare(dto.password!, verfyI.password)
    if(!vp){
      dto.password = await bcrypt.hash(dto.password!,7)
    }
    const update = await this.userModels.update(dto, {
      where:{id},
      returning:true
    })
    return update
  }

  async remove(id: number) {
    const verfyI = await this.findOne(id);
    if (!verfyI) {
      throw new NotFoundException("bunday id yoq");
    }
    await this.userModels.destroy({where:{id}})
    return "Malumot ichrildi"
  }
}
