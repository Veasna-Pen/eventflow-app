import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from '@app/common';

@Module({
  imports: [HttpModule, CommonModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
