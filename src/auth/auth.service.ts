import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthenticateRequestDto } from './dto/authenticate.request.dto';
import { jwtConstants } from './constants/auth-jwt.contants';
import { JWTPayload } from './interfaces/payload-jwt.interface';
import { JWT_TOKEN_EXPIRED } from './constants/error-message-auth.constants';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private readonly configService: ConfigService,
  ) { }

  async signIn(userCredentials: AuthenticateRequestDto): Promise<any> {
    const userFound = await this.usersService.findByEmail(
      userCredentials.email,
    );

    if (!userFound) {
      throw this.handleUnauthorizedError();
    }

    const isMatch = await bcrypt.compare(
      userCredentials.password,
      userFound?.password || '',
    );

    if (!isMatch) {
      throw this.handleUnauthorizedError();
    }

    const { id, firstName, lastName, email } = userFound;

    const [accessToken, refreshToken] = this.getTokens(
      id,
      firstName || '',
      lastName || '',
      email,
    );

    return {
      accessToken,
      refreshToken,
      sub: id,
      firstName,
      lastName,
      email,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.validateToken(refreshToken);
      const { sub, name, lastName, email } = payload;

      const [accessToken, newRefreshToken] = this.getTokens(
        sub,
        name,
        lastName,
        email,
      );

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw this.handleTokenExpiredError();
      } else {
        throw this.handleUnauthorizedError();
      }
    }
  }

  generateToken = ({ sub, name, lastName, email }: JWTPayload) => {
    return this.jwtService.sign(
      { sub, name, lastName, email },
    );
  };

  generateRefreshToken = ({ sub, name, lastName, email }: JWTPayload) => {
    return this.jwtService.sign(
      { sub, name, lastName, email },
    );
  };

  getTokens(sub: string, name: string, lastName: string, email: string) {
    const accessToken = this.generateToken({
      sub,
      name,
      lastName,
      email,
    });

    const refreshToken = this.generateRefreshToken({
      sub,
      name,
      lastName,
      email,
    });

    console.log("accessToken ", accessToken);
    console.log("refreshToken ", refreshToken);


    return [accessToken, refreshToken];
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
  }

  handleTokenExpiredError() {
    return new UnauthorizedException(JWT_TOKEN_EXPIRED);
  }

  handleUnauthorizedError() {
    return new UnauthorizedException();
  }
}
