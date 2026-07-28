import { Test, TestingModule } from '@nestjs/testing';
import { EventsServiceController } from './events-service.controller';
import { EventsServiceService } from './events-service.service';

describe('EventsServiceController', () => {
  let eventsServiceController: EventsServiceController;
  let eventsServiceService: {
    create: jest.Mock;
    findAll: jest.Mock;
    findMyEvent: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    publish: jest.Mock;
    cancel: jest.Mock;
  };

  beforeEach(async () => {
    eventsServiceService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findMyEvent: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      publish: jest.fn(),
      cancel: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [EventsServiceController],
      providers: [
        {
          provide: EventsServiceService,
          useValue: eventsServiceService,
        },
      ],
    }).compile();

    eventsServiceController = app.get<EventsServiceController>(
      EventsServiceController,
    );
  });

  describe('create', () => {
    it('should create an event for the current user', () => {
      const dto = {
        title: 'Launch Night',
        description: 'Opening event',
        date: '2026-08-01T00:00:00.000Z',
        location: 'Bangkok',
        capacity: 100,
        price: 2500,
      };
      const response = { id: 'event-id', ...dto };

      eventsServiceService.create.mockReturnValue(response);

      expect(eventsServiceController.create(dto, 'organizer-id')).toBe(
        response,
      );
      expect(eventsServiceService.create).toHaveBeenCalledWith(
        dto,
        'organizer-id',
      );
    });
  });

  describe('findAll', () => {
    it('should return published events', () => {
      const response = [{ id: 'event-id', title: 'Launch Night' }];

      eventsServiceService.findAll.mockReturnValue(response);

      expect(eventsServiceController.findAll()).toBe(response);
      expect(eventsServiceService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findMyEvent', () => {
    it('should return events for the current organizer', () => {
      const response = [{ id: 'event-id', organizerId: 'organizer-id' }];

      eventsServiceService.findMyEvent.mockReturnValue(response);

      expect(eventsServiceController.findMyEvent('organizer-id')).toBe(
        response,
      );
      expect(eventsServiceService.findMyEvent).toHaveBeenCalledWith(
        'organizer-id',
      );
    });
  });

  describe('findOne', () => {
    it('should return an event by id', () => {
      const response = { id: 'event-id', title: 'Launch Night' };

      eventsServiceService.findOne.mockReturnValue(response);

      expect(eventsServiceController.findOne('event-id')).toBe(response);
      expect(eventsServiceService.findOne).toHaveBeenCalledWith('event-id');
    });
  });

  describe('update', () => {
    it('should update an event', () => {
      const dto = { title: 'Updated Launch Night' };
      const response = { id: 'event-id', ...dto };

      eventsServiceService.update.mockReturnValue(response);

      expect(
        eventsServiceController.update('event-id', dto, 'organizer-id', 'USER'),
      ).toBe(response);
      expect(eventsServiceService.update).toHaveBeenCalledWith(
        'event-id',
        dto,
        'organizer-id',
        'USER',
      );
    });
  });

  describe('publish', () => {
    it('should publish an event', () => {
      const response = { id: 'event-id', status: 'PUBLISHED' };

      eventsServiceService.publish.mockReturnValue(response);

      expect(
        eventsServiceController.publish('event-id', 'organizer-id', 'USER'),
      ).toBe(response);
      expect(eventsServiceService.publish).toHaveBeenCalledWith(
        'event-id',
        'organizer-id',
        'USER',
      );
    });
  });

  describe('cancel', () => {
    it('should cancel an event', () => {
      const response = { id: 'event-id', status: 'CANCELLED' };

      eventsServiceService.cancel.mockReturnValue(response);

      expect(
        eventsServiceController.cancel('event-id', 'organizer-id', 'USER'),
      ).toBe(response);
      expect(eventsServiceService.cancel).toHaveBeenCalledWith(
        'event-id',
        'organizer-id',
        'USER',
      );
    });
  });
});
