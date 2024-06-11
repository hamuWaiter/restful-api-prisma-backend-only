import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { User as UserModel, Post as PostModel, Prisma, Site } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  // 返回所有site记录
  // @Get('sites')
  // async getSiteLS(): Promise<Site[]> {
  //   return this.prismaService.site.findMany()
  // }

  @Get('sites')
  async getPatientList(page = 1, pageSize = 10): Promise<Site[]> {
    const skip = (page - 1) * pageSize;

    return this.prismaService.site.findMany({
      // orderBy: { updateTime: "desc" },
      take: pageSize,
      skip,
    });
  }

  // 根据id查询记录
  @Get('site/:id')
  async getSiteById(@Param('id') id: string): Promise<Site> {
    return this.prismaService.site.findFirst({
      where: { id: Number(id) }
    })
  }

  // 追加记录
  @Post('site')
  async createSite(
    @Body() params: { title: string; url: string },
  ): Promise<Site> {
    const { title, url } = params
    return this.prismaService.site.create({
      data: {
        title,
        url
      },
    })
  }

  // 修改记录
  @Post('site/:id')
  async setSiteById(
    @Param('id') id: string,
    @Body() data: Site
  ): Promise<Site> {
    return this.prismaService.site.update({
      where: { id: Number(id) },
      data,
    })
  }
}
