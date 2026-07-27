import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CheckInTicketDto, ErrorHelper, EventResponse, PurchaseTicketDto, SERVICE_PORTS, TicketResponse } from '@app/common';

@Injectable()
export class TicketsService {
    private readonly ticketServiceUrl = `http://localhost:${SERVICE_PORTS.TICKETS_SERVICE}`;

    constructor(
        private readonly httpService: HttpService,
        private readonly errorHelper: ErrorHelper,
    ) { }

    async purchase(data: PurchaseTicketDto, userId: string): Promise<TicketResponse[]> {
        try {
            const response = await firstValueFrom(this.httpService.post<TicketResponse[]>(`${this.ticketServiceUrl}/purchase`,
                data,
                {
                    headers: { 'x-user-id': userId }
                }))

            return response.data;
        } catch (error) {
            this.errorHelper.handle(error)
        }
    }

    async findMyTickets(userId: string): Promise<TicketResponse[]> {
        try {
            const response = await firstValueFrom(this.httpService.get<TicketResponse[]>(`${this.ticketServiceUrl}/my-tickets`,
                {
                    headers: { 'x-user-id': userId }
                }))

            return response.data;
        } catch (error) {
            this.errorHelper.handle(error);
        }
    }

    async findOne(id: string, userId: string): Promise<TicketResponse> {
        try {
            const response = await firstValueFrom(this.httpService.get<TicketResponse>(`${this.ticketServiceUrl}/${id}`,
                {
                    headers: { 'x-user-id': userId }
                }))

            return response.data;
        } catch (error) {
            this.errorHelper.handle(error);
        }
    }

    async cancel(id: string, userId: string): Promise<TicketResponse> {
        try {
            const response = await firstValueFrom(this.httpService.post<TicketResponse>(`${this.ticketServiceUrl}/${id}/cancel`,
                {},
                {
                    headers: { 'x-user-id': userId }
                }))

            return response.data;
        } catch (error) {
            this.errorHelper.handle(error);
        }
    }

    async checkIn(data: CheckInTicketDto, organizerId: string): Promise<TicketResponse> {
        try {
            const response = await firstValueFrom(this.httpService.post<TicketResponse>(`${this.ticketServiceUrl}/check-in`,
                data,
                {
                    headers: { 'x-user-id': organizerId }
                }))

            return response.data;
        } catch (error) {
            this.errorHelper.handle(error);
        }
    }

    async findEventTickets(eventId: string, organizerId: string): Promise<TicketResponse[]> {
        try {
            const response = await firstValueFrom(this.httpService.get<TicketResponse[]>(`${this.ticketServiceUrl}/event/${eventId}`,
                {
                    headers: { 'x-user-id': organizerId }
                }))

            return response.data;
        } catch (error) {
            this.errorHelper.handle(error);
        }
    }
}
