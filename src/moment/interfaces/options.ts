import { ModuleMetadata } from '@nestjs/common';

export interface MomentModuleOptions {
  isGlobal?: boolean;
  tz?: string;
}

export interface MomentModulePartialOptions
  extends Omit<MomentModuleOptions, 'isGlobal'> {}

export interface MomentModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useFactory: (
    ...args: any[]
  ) => Promise<MomentModulePartialOptions> | MomentModulePartialOptions;
  inject?: any[];
}
