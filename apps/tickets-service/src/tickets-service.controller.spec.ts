import { Test, TestingModule } from '@nestjs/testing';
import { TicketsServiceController } from './tickets-service.controller';
import { TicketsServiceService } from './tickets-service.service';

describe('TicketsServiceController', () => {
  let ticketsServiceController: TicketsServiceController;
  let ticketsServiceService: {
    purchase: jest.Mock;
    findMyTicket: jest.Mock;
    findOne: jest.Mock;
    cancel: jest.Mock;
    checkIn: jest.Mock;
    findEventTicket: jest.Mock;
  };

  beforeEach(async () => {
    ticketsServiceService = {
      purchase: jest.fn(),
      findMyTicket: jest.fn(),
      findOne: jest.fn(),
      cancel: jest.fn(),
      checkIn: jest.fn(),
      findEventTicket: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [TicketsServiceController],
      providers: [
        {
          provide: TicketsServiceService,
          useValue: ticketsServiceService,
        },
      ],
    }).compile();

    ticketsServiceController = app.get<TicketsServiceController>(
      TicketsServiceController,
    );
  });

  describe('purchase', () => {
    it('should purchase tickets for the current user', () => {
      const dto = { eventId: 'event-id', quantity: 2 };
      const response = { message: 'Ticket purchased successfully' };

      ticketsServiceService.purchase.mockReturnValue(response);

      expect(ticketsServiceController.purchase(dto, 'user-id')).toBe(response);
      expect(ticketsServiceService.purchase).toHaveBeenCalledWith(
        dto,
        'user-id',
      );
    });
  });

  describe('findMyTickets', () => {
    it('should return tickets for the current user', () => {
      const response = [{ id: 'ticket-id', userId: 'user-id' }];

      ticketsServiceService.findMyTicket.mockReturnValue(response);

      expect(ticketsServiceController.findMyTickets('user-id')).toBe(response);
      expect(ticketsServiceService.findMyTicket).toHaveBeenCalledWith(
        'user-id',
      );
    });
  });

  describe('findOne', () => {
    it('should return one ticket for the current user', () => {
      const response = { id: 'ticket-id', userId: 'user-id' };

      ticketsServiceService.findOne.mockReturnValue(response);

      expect(ticketsServiceController.findOne('ticket-id', 'user-id')).toBe(
        response,
      );
      expect(ticketsServiceService.findOne).toHaveBeenCalledWith(
        'ticket-id',
        'user-id',
      );
    });
  });

  describe('cancel', () => {
    it('should cancel one ticket for the current user', () => {
      const response = { message: 'Ticket cancelled successfully' };

      ticketsServiceService.cancel.mockReturnValue(response);

      expect(ticketsServiceController.cancel('ticket-id', 'user-id')).toBe(
        response,
      );
      expect(ticketsServiceService.cancel).toHaveBeenCalledWith(
        'ticket-id',
        'user-id',
      );
    });
  });

  describe('checkIn', () => {
    it('should check in a ticket', () => {
      const response = { message: 'Ticket checked in successfully' };

      ticketsServiceService.checkIn.mockReturnValue(response);

      expect(
        ticketsServiceController.checkIn(
          { ticketCode: 'ABC123' },
          'organizer-id',
        ),
      ).toBe(response);
      expect(ticketsServiceService.checkIn).toHaveBeenCalledWith(
        'ABC123',
        'organizer-id',
      );
    });
  });

  describe('findEventTickets', () => {
    it('should return event tickets for the organizer', () => {
      const response = [{ id: 'ticket-id', eventId: 'event-id' }];

      ticketsServiceService.findEventTicket.mockReturnValue(response);

      expect(
        ticketsServiceController.findEventTickets('event-id', 'organizer-id'),
      ).toBe(response);
      expect(ticketsServiceService.findEventTicket).toHaveBeenCalledWith(
        'event-id',
        'organizer-id',
      );
    });
  });
});
