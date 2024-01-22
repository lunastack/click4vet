import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnersModule } from './owners/owners.module';

import { PetsModule } from './pets/pets.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.DATABASE_URL || "") ,
    PetsModule,
    OwnersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule { }
