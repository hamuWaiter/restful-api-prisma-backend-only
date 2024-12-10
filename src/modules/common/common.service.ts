import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as http from 'http';
import * as marked from 'marked';

@Injectable()
export class CommonService {
  constructor(private readonly prismaService: PrismaService) {}

  // 获取网络文件
  async getFile(url: string) {
    const fileData = await new Promise<Buffer>((resolve, reject) => {
      http.get(url, (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      });
    });

    const base64Data = fileData.toString('base64');

    return { data: base64Data };
  }

  // 获取Markdown文件内容并解析为HTML格式
  async markdown2html(url: string) {
    const markdownData = await new Promise<string>((resolve, reject) => {
      http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
        res.on('error', reject);
      });
    });

    const htmlData = await marked.parse(markdownData);

    return { data: htmlData };
  }
}