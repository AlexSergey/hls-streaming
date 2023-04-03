import { Injectable, OnModuleInit } from '@nestjs/common';
import { join, basename } from 'node:path';
import * as chokidar from 'chokidar';
import { promises } from 'fs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CONVERTER_EVENTS } from '../events/events';
import { getRoot } from '../../utils/folder';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SourceObserverService implements OnModuleInit {
  private files: string[] = [];
  private onFinishCallback: number;
  constructor(private eventEmitter: EventEmitter2, private configService: ConfigService) {}
  isFolderExist = async (folder) => {
    try {
      const stat = await promises.stat(folder);
      return stat.isDirectory();
    } catch (e) {
      return false;
    }
  };
  async onAdd(path: string) {
    const filename = basename(path);
    const convertedDirectory = join(getRoot(), this.configService.get<string>('CONVERTED'));

    const isFolderExist = await this.isFolderExist(join(convertedDirectory, filename));

    if (isFolderExist) {
      console.log(`${filename} is already converted`);
      return;
    }

    this.files.push(filename);
  }

  onFinish = () => {
    this.eventEmitter.emit(CONVERTER_EVENTS.process, this.files);
    this.files = [];
  };

  async onModuleInit() {
    const observedDirectory = join(getRoot(), this.configService.get<string>('SOURCE'));

    chokidar.watch(observedDirectory).on('add', (path) => {
      clearTimeout(this.onFinishCallback);
      this.onAdd(path);
      this.onFinishCallback = setTimeout(this.onFinish, 300, this);
    });
  }
}
