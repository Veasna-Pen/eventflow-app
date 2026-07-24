import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ErrorHelper, SERVICE_PORTS } from '@app/common';

@Injectable()
export class AuthService {
  private readonly authServiceUrl = `http://localhost:${SERVICE_PORTS.AUTH_SERVICE}`;

  constructor(
    private readonly httpService: HttpService,
    private readonly errorHelper: ErrorHelper,
  ) { }

  async register(data: { email: string; password: string; name: string }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/register`, data),
      );
      return response.data;
    } catch (error) {
      this.errorHelper.handle(error);
    }
  }

  async login(data: { email: string; password: string }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/login`, data),
      );
      return response.data;
    } catch (error) {
      this.errorHelper.handle(error);
    }
  }

  async getProfile(token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.authServiceUrl}/profile`, {
          headers: { Authorization: token }
        }),
      );
      return response.data;
    } catch (error) {
      this.errorHelper.handle(error);
    }
  }
}
