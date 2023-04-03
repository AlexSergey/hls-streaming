import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { MoviesService } from '../shared/services/movies.service.shared';

@Module({
  imports: [],
  controllers: [],
  providers: [MoviesService, NotificationGateway],
})
export class NotificationModule {}
