import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as ffmpeg from 'fluent-ffmpeg';
import { join } from 'node:path';
import { mkdirp } from 'mkdirp';
import { CONVERTER_EVENTS } from '../events/events';
import { getRoot } from '../../utils/folder';
import { ConfigService } from '@nestjs/config';
import { CONVERTER_EVENTS_SHARED } from '../../shared/events/events.shared';

@Injectable()
export class ConvertService {
  constructor(private eventEmitter: EventEmitter2, private configService: ConfigService) {}

  async emulate() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
  @OnEvent(CONVERTER_EVENTS.convert)
  async convert({ currentFile, id }: { id: number; currentFile: string }) {
    const srcFile = join(getRoot(), this.configService.get<string>('SOURCE'), currentFile);
    const distFolder = join(getRoot(), this.configService.get<string>('CONVERTED'), currentFile);
    await mkdirp(distFolder);

    console.log(`File: ${currentFile} is converting`);

    ffmpeg(srcFile)
      .addOutput(join(distFolder, `${this.configService.get<string>('CONVERTED_FILE')}.m3u8`))
      .addOutputOptions([
        `-hls_time ${this.configService.get<string>('HLS_OUTPUT')}`, // HLS output option.
        '-hls_playlist_type vod', // HLS output option.
        `-hls_segment_filename ${distFolder}/${this.configService.get<string>('CONVERTED_FILE')}_%03d.ts`, // HLS output option.
      ])
      .on('progress', (progress) => {
        console.log(`Processing: ${progress.percent}% done`);
      })
      .on('end', () => {
        console.log(`The file ${currentFile} successfully converted`);
        this.eventEmitter.emit(CONVERTER_EVENTS_SHARED.converted, id);
      })
      .run();
    //
  }
}
