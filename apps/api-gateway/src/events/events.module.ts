import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CommonModule } from '@app/common';

@Module({
    imports: [HttpModule, CommonModule],
    controllers: [EventsController],
    providers: [EventsService],
})
export class EventsModule { }
