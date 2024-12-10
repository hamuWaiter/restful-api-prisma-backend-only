import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { Readable } from 'stream';
import { ApiTags } from '@nestjs/swagger';
import { CommonService } from './common.service';

// api-doc文档用
@ApiTags('common')
// 路径前缀
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  // 获取网络文件
  @Post('download')
  async getFileStream(@Body() data: { file:string }): Promise<{ data: string }> {
    return this.commonService.getFile(data.file);
  }

  // 获取网络文件
  @Post('markdown2html')
  async markdown2html(@Body() data: { file:string }): Promise<{ data: string }> {
    return this.commonService.markdown2html(data.file);
  }

  // @Post(':id')
  // async updateSiteById(
  //   @Param('id') id: string,
  //   @Body() data: Blog
  // ) {
  //   return this.blogService.updateItem(+id, data)
  // }
}
