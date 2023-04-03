import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FoldersModule } from './folders/folders.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: function (req, file, callback) {
            callback(null, configService.get<string>('SOURCE'));
          },
          filename: function (req, file, callback) {
            callback(null, file.originalname);
          },
        }),
      }),
    }),
    FoldersModule,
  ],
  controllers: [UploadController],
})
export class UploadModule {}
