import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthAdminGuard } from '../common/guards/jwt_auth_admin.guard';
import { SelfGuard } from '../common/guards/self.guard';

@ApiBearerAuth()
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthAdminGuard)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
  @UseGuards(JwtAuthAdminGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(JwtAuthAdminGuard)
  @Get("email/:email")
  findOneByEmail(@Param("email") email: string) {
    return this.adminService.findOneByEmail(email);
  }

  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthAdminGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthAdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthAdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
