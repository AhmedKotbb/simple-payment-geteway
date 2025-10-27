import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../db-config/repositories/user.repository';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly repo: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization'];

    // console.log(token)

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const payload: any = jwt.verify(token, this.config.get<string>('JWT_SECRET_KEY')!);
      // console.log(payload)
      // Validate tokenID matches the user's activeTokenID
      const user = await this.repo.findById(payload.id);
      // console.log(user)
      if (!user || user.activeTokenID !== payload.tokenID) {
        throw new UnauthorizedException('Token invalid or expired');
      }

      // Attach user to request
      request['user'] = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token verification failed');
    }
  }
}
