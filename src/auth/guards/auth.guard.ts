import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT_TOKEN_EXPIRED } from '../constants/error-message-auth.constants';
import { HttpErrorException } from '@core/exceptions/http-error.exception';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { token, request } = this.getToken(context);
      request['user'] = this.authService.validateToken(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        this.handleTokenExpiredError(error);
      } else {
        this.handleUnauthorizedError();
      }
    }
    return true;
  }

  private handleTokenExpiredError(error: TokenExpiredError): never {
    throw new HttpErrorException(new UnauthorizedException(JWT_TOKEN_EXPIRED), {
      source: AuthGuard.name,
      error,
    });
  }

  private handleUnauthorizedError(): never {
    throw new HttpErrorException(new UnauthorizedException(), {
      source: AuthGuard.name,
    });
  }

  private getToken(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new Error();
    }

    return { token, request };
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
