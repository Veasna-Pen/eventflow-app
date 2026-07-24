import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateEventDto, ErrorHelper, EventResponse, SERVICE_PORTS, UpdateEventDto } from '@app/common';

@Injectable()
export class EventsService {
    private readonly eventServiceUrl = `http://localhost:${SERVICE_PORTS.EVENTS_SERVICE}`;

    constructor(
        private readonly httpService: HttpService,
        private readonly errorHelper: ErrorHelper,
    ) { }

    async create(data: CreateEventDto, userId: string, userRole: string): Promise<EventResponse> {
        try {
            const response = await firstValueFrom(this.httpService.post<EventResponse>(
                this.eventServiceUrl, data, {
                headers: { 'x-user-id': userId, 'x-user-role': userRole },
            }))
            return response.data;
        } catch (error) {
            this.errorHelper.handle(error)
        }
    }

    async findAll(): Promise<EventResponse[]> {
        try {
            const response = await firstValueFrom(this.httpService.get<EventResponse[]>(
                this.eventServiceUrl));
            return response.data;
        } catch (error) {
            this.errorHelper.handle(error)
        }
    }

    async findMyEvents(userId: string): Promise<EventResponse[]> {
        try {
            const response = await firstValueFrom(this.httpService.get<EventResponse[]>(
                `${this.eventServiceUrl}/my-events`, {
                headers: { 'x-user-id': userId },
            }));

            return response.data;
        } catch (error) {
            this.errorHelper.handle(error);
        }
    }

    async findOne(id: string): Promise<EventResponse> {
        try {
            const response = await firstValueFrom(this.httpService.get<EventResponse>(
                `${this.eventServiceUrl}/${id}`));

            return response.data;
        } catch (error) {
            this.errorHelper.handle(error)
        }
    }

    async update(id: string, data: UpdateEventDto, userId: string, userRole: string): Promise<EventResponse> {
        try {
            const response = await firstValueFrom(this.httpService.put<EventResponse>(
                `${this.eventServiceUrl}/${id}`, data, {
                headers: { 'x-user-id': userId, 'x-user-role': userRole },
            }));

            return response.data;
        } catch (error) {
            this.errorHelper.handle(error);
        }
    }

    async public(id: string, userId: string, userRole: string): Promise<EventResponse> {
        try {
            const response = await firstValueFrom(this.httpService.post<EventResponse>(
                `${this.eventServiceUrl}/${id}/publish`, {}, {
                headers: { 'x-user-id': userId, 'x-user-role': userRole }
            }))

            return response.data;
        } catch (error) {
            this.errorHelper.handle(error);
        }
    }

    async cancel(id: string, userId: string, userRole: string): Promise<EventResponse> {
        try {
            const response = await firstValueFrom(this.httpService.post<EventResponse>(
                `${this.eventServiceUrl}/${id}/cancel`, {}, {
                headers: { 'x-user-id': userId, 'x-user-role': userRole }
            }))

            return response.data;
        } catch (error) {
            this.errorHelper.handle(error);
        }
    }
}
