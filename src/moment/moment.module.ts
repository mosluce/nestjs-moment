import { DynamicModule } from '@nestjs/common';
import moment from 'moment';
import 'moment-timezone';
import { MOMENT, MOMENT_MODULE_OPTIONS, MOMENT_TZ } from './constants';
import { MomentModuleAsyncOptions, MomentModuleOptions } from './interfaces';

export class MomentModule {
  static forRoot(options: MomentModuleOptions): DynamicModule {
    return {
      module: MomentModule,
      global: options.isGlobal || false,
      providers: [
        {
          provide: MOMENT,
          useValue: (date: any) => moment(date),
        },
        {
          provide: MOMENT_TZ,
          useValue: (date: any, tz: string) =>
            moment.tz(date, tz || options.tz || ''),
        },
      ],
      exports: [],
    };
  }

  static forRootAsync(options: MomentModuleAsyncOptions): DynamicModule {
    return {
      module: MomentModule,
      global: options.isGlobal || false,
      providers: [
        {
          provide: MOMENT_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        {
          provide: MOMENT,
          useValue: (date: any) => moment(date),
        },
        {
          provide: MOMENT_TZ,
          inject: [MOMENT_MODULE_OPTIONS],
          useFactory: (options: MomentModuleOptions) => (
            date: any,
            tz: string
          ) => moment.tz(date, tz || options.tz || ''),
        },
      ],
    };
  }
}
