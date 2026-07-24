import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ErrorHelper } from './utils/error.util';

@Module({
  providers: [CommonService, ErrorHelper],
  exports: [CommonService, ErrorHelper],
})
export class CommonModule {}
