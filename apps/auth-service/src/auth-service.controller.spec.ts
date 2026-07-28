import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';

describe('AuthServiceController', () => {
  let authServiceController: AuthServiceController;
  let authServiceService: {
    register: jest.Mock;
    login: jest.Mock;
    getProfile: jest.Mock;
  };

  beforeEach(async () => {
    authServiceService = {
      register: jest.fn(),
      login: jest.fn(),
      getProfile: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthServiceController],
      providers: [
        {
          provide: AuthServiceService,
          useValue: authServiceService,
        },
      ],
    }).compile();

    authServiceController = app.get<AuthServiceController>(
      AuthServiceController,
    );
  });

  describe('register', () => {
    it('should register a user', () => {
      const dto = {
        email: 'user@example.com',
        password: 'password',
        name: 'Test User',
      };
      const response = {
        message: 'User registered successfully',
        userId: 'user-id',
      };

      authServiceService.register.mockReturnValue(response);

      expect(authServiceController.register(dto)).toBe(response);
      expect(authServiceService.register).toHaveBeenCalledWith(
        dto.email,
        dto.password,
        dto.name,
      );
    });
  });

  describe('login', () => {
    it('should log in a user', () => {
      const dto = {
        email: 'user@example.com',
        password: 'password',
      };
      const response = { access_token: 'token' };

      authServiceService.login.mockReturnValue(response);

      expect(authServiceController.login(dto)).toBe(response);
      expect(authServiceService.login).toHaveBeenCalledWith(
        dto.email,
        dto.password,
      );
    });
  });

  describe('getProfile', () => {
    it('should return a user profile', () => {
      const response = {
        id: 'user-id',
        email: 'user@example.com',
        name: 'Test User',
        role: 'USER',
      };

      authServiceService.getProfile.mockReturnValue(response);

      expect(
        authServiceController.getProfile({ user: { userId: 'user-id' } }),
      ).toBe(response);
      expect(authServiceService.getProfile).toHaveBeenCalledWith('user-id');
    });
  });
});
