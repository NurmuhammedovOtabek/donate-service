import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const verfy = await this.findOneByName(createCategoryDto.name)
    if(verfy){
      throw new ConflictException("Bunday category mavjud")
    }
    const newCategory = await this.categoryModel.create(createCategoryDto)
    return newCategory
  }

  async findAll() {
    const allCategory = await this.categoryModel.findAll()
    return allCategory
  }

  async findOneByName(name: string) {
    const byName = await this.categoryModel.findOne({where:{name}})
    return byName
  }

  async findOne(id: number) {
    const ById = await this.categoryModel.findOne({where:{id}})
    return ById
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const verfy = await this.findOne(id)
    if(!verfy){
      throw new NotFoundException("Bunday idli category yoq")
    }
    const update = await this.categoryModel.update(updateCategoryDto,{
      where:{id},
      returning:true
    })
    return update[1][0]
  }

  async remove(id: number) {
    const verfy = await this.findOne(id);
    if (!verfy) {
      throw new NotFoundException("Bunday idli category yoq");
    }
    await this.categoryModel.destroy({where:{id}})
    return "Category ochrildi"
  }
}
