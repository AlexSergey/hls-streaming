import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Queue, IQueue } from './queue';
import { CONVERTER_EVENTS } from '../events/events';
import { CONVERTER_EVENTS_SHARED } from '../../shared/events/events.shared';

@Injectable()
export class ProcessorService {
  private queues: IQueue<IQueue<string>> = new Queue();
  private jobs: { id: number; timer: NodeJS.Timeout }[] = [];
  private inProgress = false;
  constructor(private eventEmitter: EventEmitter2) {}

  iteration() {
    const currentQueue = this.queues.dequeue();

    for (let i = 0, l = currentQueue.size(); i < l; i++) {
      const currentFile = currentQueue.dequeue();

      const timer = setInterval(() => {
        if (this.inProgress) {
          return;
        }
        this.inProgress = true;
        this.eventEmitter.emit(CONVERTER_EVENTS.convert, { currentFile, id: i });
      }, 100);

      this.jobs.push({ id: i, timer });
    }
  }

  @OnEvent(CONVERTER_EVENTS_SHARED.converted)
  converted(id: number) {
    this.inProgress = false;
    const job = this.jobs.find((job) => job.id === id);

    if (job) {
      clearInterval(job.timer);
    }

    this.jobs = this.jobs.filter((job) => job.id !== id);
  }

  @OnEvent(CONVERTER_EVENTS.process)
  process(files: string[]) {
    const queue = new Queue<string>();
    files.forEach((filename) => queue.enqueue(filename));
    this.queues.enqueue(queue);
    this.iteration();
  }
}
