import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

export interface ClassInterface {
  new (...args: any[]): {};
}

export const Serialize = (dto: ClassInterface) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassInterface) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.dto, data, {
          strategy: 'excludeAll',
          exposeUnsetFields: false,
          excludeExtraneousValues: true,
          enableImplicitConversion: true,
        });
      }),
    );
  }
}
