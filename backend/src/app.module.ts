import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TaskModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
  ],
})
export class AppModule {}
