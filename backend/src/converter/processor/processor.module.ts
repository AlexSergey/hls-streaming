import { Module } from '@nestjs/common';
import { ProcessorService } from './processor.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ProcessorService],
})
export class ProcessorModule {}
