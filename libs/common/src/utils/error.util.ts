import {
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';

@Injectable()
export class ErrorHelper {
    handle(error: unknown): never {
        const err = error as {
            response?: {
                data: string | object;
                status: number;
            };
        };

        if (err.response) {
            throw new HttpException(
                err.response.data,
                err.response.status,
            );
        }

        throw new HttpException(
            'Something went wrong',
            HttpStatus.SERVICE_UNAVAILABLE,
        );
    }
}