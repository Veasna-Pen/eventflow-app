import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthResponse, ErrorHelper, SERVICE_PORTS, UserProfileResponse } from '@app/common';

@Injectable()
export class AuthService {
  private readonly authServiceUrl = `http://localhost:${SERVICE_PORTS.AUTH_SERVICE}`;

  constructor(
    private readonly httpService: HttpService,
    private readonly errorHelper: ErrorHelper,
  ) { }

  async register(data: { email: string; password: string; name: string }): Promise<UserProfileResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<UserProfileResponse>(`${this.authServiceUrl}/register`, data),
      );
      return response.data;
    } catch (error) {
      this.errorHelper.handle(error);
    }
  }

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<AuthResponse>(`${this.authServiceUrl}/login`, data),
      );
      return response.data;
    } catch (error) {
      this.errorHelper.handle(error);
    }
  }

  async getProfile(token: string): Promise<UserProfileResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<UserProfileResponse>(`${this.authServiceUrl}/profile`, {
          headers: { Authorization: token }
        }),
      );
      return response.data;
    } catch (error) {
      this.errorHelper.handle(error);
    }
  }
}
