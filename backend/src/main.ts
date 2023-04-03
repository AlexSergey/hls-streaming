import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SocketAdapter } from './adapters/socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  app.setGlobalPrefix('api');
  app.useWebSocketAdapter(new SocketAdapter(app, configService));

  await app.listen(port);
}
bootstrap();
