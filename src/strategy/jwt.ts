import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  createToken(user: any): string {
    const secret = '12345Abc';
    const dataStoredInToken = { _id: user._id };
    return this.jwtService.sign(dataStoredInToken, { secret });
  }

  createCookie(token: string): string {

    return `your-cookie-name=${token}; Path=/; HttpOnly`;
  }
}