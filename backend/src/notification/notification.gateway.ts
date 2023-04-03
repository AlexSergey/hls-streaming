import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MoviesService } from '../shared/services/movies.service.shared';
import { OnEvent } from '@nestjs/event-emitter';
import { CONVERTER_EVENTS_SHARED } from '../shared/events/events.shared';
import { MOVIES_UPDATE } from './events.external';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly moviesService: MoviesService) {}

  @OnEvent(CONVERTER_EVENTS_SHARED.converted)
  async updateMovies(): Promise<void> {
    const movies = await this.moviesService.getMovies();
    console.log('updateMovies', movies);
    this.server.emit(MOVIES_UPDATE, JSON.stringify(movies));
  }
}
