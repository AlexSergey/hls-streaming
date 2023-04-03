import { Injectable, OnModuleInit } from '@nestjs/common';
import { mkdirp } from 'mkdirp';
import { join } from 'node:path';
import { ConfigService } from '@nestjs/config';
import { getRoot } from '../../utils/folder';

@Injectable()
export class FoldersService implements OnModuleInit {
  constructor(private configService: ConfigService) {}
  async onModuleInit() {
    await mkdirp(join(getRoot(), this.configService.get<string>('SOURCE')));
    await mkdirp(join(getRoot(), this.configService.get<string>('CONVERTED')));
  }
}
