import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { ServerOptions } from 'socket.io';
import { ConfigService } from '@nestjs/config';

export class SocketAdapter extends IoAdapter {
  constructor(private app: INestApplicationContext, private configService: ConfigService) {
    super(app);
  }
  createIOServer(
    port: number,
    options?: ServerOptions & {
      namespace?: string;
      server?: any;
    },
  ) {
    const configPort = Number(this.configService.get<number>('SOCKET_PORT'));
    port = typeof configPort === 'number' && !isNaN(configPort) ? configPort : typeof port === 'number' ? port : 81;
    return super.createIOServer(port, { ...options, cors: true });
  }
}
