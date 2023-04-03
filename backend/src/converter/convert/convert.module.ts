import { Module } from '@nestjs/common';
import { ConvertService } from './convert.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ConvertService],
})
export class ConvertModule {}
