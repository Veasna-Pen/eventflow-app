import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { CommonModule } from '@app/common';

@Module({
    imports: [HttpModule, CommonModule],
    controllers: [TicketsController],
    providers: [TicketsService],
})
export class TicketsModule { }