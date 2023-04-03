import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class UploadController {
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 5))
  uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('files');
    return files.map((file) => file.originalname);
  }
}
