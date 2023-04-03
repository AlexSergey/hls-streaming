import { Injectable } from '@nestjs/common';
import { promises } from 'node:fs';
import { join } from 'node:path';
import { ConfigService } from '@nestjs/config';
import { getRoot } from '../../utils/folder';
import { IMovie } from '../../types/movie';

@Injectable()
export class MoviesService {
  constructor(private configService: ConfigService) {}
  async getMovies(): Promise<IMovie[]> {
    const convertedFolder = join(getRoot(), this.configService.get<string>('CONVERTED'));
    const folders = await promises.readdir(convertedFolder);
    return folders.map((folder) => ({
      title: folder,
      url: `${this.configService.get<string>('SERVE')}/${folder}/${this.configService.get<string>(
        'CONVERTED_FILE',
      )}.m3u8`,
    }));
  }
}
