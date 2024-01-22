import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth-jwt.contants';
import { UsersModule } from '../users/users.module';
import { HttpResponseService } from '@core/service/http-response.service';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {

        console.log("configService.get<string>('JWT_SECRET') ", configService.get<string>('JWT_SECRET'));
        console.log("configService.get<string>('JWT_TOKEN_EXPIRES_IN') ", configService.get<string>('JWT_TOKEN_EXPIRES_IN'));


        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: configService.get<string>('JWT_TOKEN_EXPIRES_IN') },
        }
      },
      global: true,
      inject: [ConfigService]
    }),
  ],
  providers: [AuthService, HttpResponseService],
  exports: [AuthService],
})
export class AuthModule { }
