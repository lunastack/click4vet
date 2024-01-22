import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiTags } from '@nestjs/swagger';
import { AuthenticateRequestDto } from './dto/authenticate.request.dto';
import { refreshTokenRequestDTO } from './dto/refresh-token.request.dto';
import { HttpErrorException } from '@core/exceptions/http-error.exception';
import { HttpResponseService } from '@core/service/http-response.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private httpResponseService: HttpResponseService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() authenticateRequestDto: AuthenticateRequestDto) {
    return this.authService.signIn(authenticateRequestDto);
  }

  @Post('refresh')
  async refreshToken(@Body() refresh: refreshTokenRequestDTO) {
    try {
      const result = this.authService.refreshToken(refresh.token);
      return this.httpResponseService.responseHttp(result);
    } catch (error) {
      throw new HttpErrorException(error, {
        source: AuthService.name,
      });
    }
  }
}
