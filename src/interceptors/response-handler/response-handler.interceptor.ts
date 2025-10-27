import { Injectable, NestInterceptor, ExecutionContext, CallHandler, } from '@nestjs/common';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface ApiResponse<T> {
  statusCode: number;
  message?: string;
  data?: T;
  timestamp?: any;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // console.log(data)
        // Format successful responses
        return {
          statusCode: 200,
          message: data?.message || 'Request successful',
          data: data.data,
          timestamp: moment().format('Y-M-D h:m:ss'),
        };
      })
    );
  }
}
