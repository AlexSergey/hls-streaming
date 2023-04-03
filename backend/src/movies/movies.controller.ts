import { Controller, Get } from '@nestjs/common';
import { MoviesService } from '../shared/services/movies.service.shared';
import { IMovie } from '../types/movie';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  movies(): Promise<IMovie[]> {
    return this.moviesService.getMovies();
  }
}
