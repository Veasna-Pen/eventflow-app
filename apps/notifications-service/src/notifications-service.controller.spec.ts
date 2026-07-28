import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsServiceController } from './notifications-service.controller';
import { NotificationsServiceService } from './notifications-service.service';

describe('NotificationsServiceController', () => {
  let notificationsServiceController: NotificationsServiceController;
  let notificationsServiceService: {
    sendWelcomeEmail: jest.Mock;
    sendTicketPurchasedEmail: jest.Mock;
    sendTicketCancelledEmail: jest.Mock;
  };

  beforeEach(async () => {
    notificationsServiceService = {
      sendWelcomeEmail: jest.fn(),
      sendTicketPurchasedEmail: jest.fn(),
      sendTicketCancelledEmail: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsServiceController],
      providers: [
        {
          provide: NotificationsServiceService,
          useValue: notificationsServiceService,
        },
      ],
    }).compile();

    notificationsServiceController = app.get<NotificationsServiceController>(
      NotificationsServiceController,
    );
  });

  describe('healthCheck', () => {
    it('should return service health', () => {
      expect(notificationsServiceController.healthCheck()).toEqual({
        status: 'ok',
        service: 'notifications-service',
      });
    });
  });

  describe('handleUserRegistered', () => {
    it('should send a welcome email', async () => {
      const payload = {
        userId: 'user-id',
        email: 'user@example.com',
        name: 'Test User',
      };

      await notificationsServiceController.handleUserRegistered(payload);

      expect(notificationsServiceService.sendWelcomeEmail).toHaveBeenCalledWith(
        payload,
      );
    });
  });

  describe('handleTicketPurchased', () => {
    it('should send a ticket purchase email', async () => {
      const payload = {
        ticketId: 'ticket-id',
        ticketCode: 'ABC123',
        userId: 'user-id',
        email: 'user@example.com',
        eventTitle: 'Launch Night',
        quantity: 2,
        totalPrice: 5000,
      };

      await notificationsServiceController.handleTicketPurchased(payload);

      expect(
        notificationsServiceService.sendTicketPurchasedEmail,
      ).toHaveBeenCalledWith(payload);
    });
  });

  describe('handleTicketCancelled', () => {
    it('should send a ticket cancellation email', async () => {
      const payload = {
        ticketId: 'ticket-id',
        userId: 'user-id',
        email: 'user@example.com',
      };

      await notificationsServiceController.handleTicketCancelled(payload);

      expect(
        notificationsServiceService.sendTicketCancelledEmail,
      ).toHaveBeenCalledWith(payload);
    });
  });
});
