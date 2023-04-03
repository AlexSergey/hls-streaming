import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { ConverterModule } from './converter/converter.module';
import { MoviesModule } from './movies/movies.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { getRoot } from './utils/folder';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: join(getRoot(), configService.get<string>('CONVERTED')),
          serveRoot: `/${configService.get<string>('SERVE')}/`,
        },
      ],
    }),
    EventEmitterModule.forRoot({
      global: true,
    }),
    UploadModule,
    ConverterModule,
    MoviesModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
