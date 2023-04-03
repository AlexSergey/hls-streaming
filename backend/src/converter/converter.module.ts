import { Module } from '@nestjs/common';
import { SourceObserverModule } from './source-observer/source-observer.module';
import { ProcessorModule } from './processor/processor.module';
import { ConvertModule } from './convert/convert.module';

@Module({
  imports: [SourceObserverModule, ProcessorModule, ConvertModule],
  controllers: [],
  providers: [],
})
export class ConverterModule {}
