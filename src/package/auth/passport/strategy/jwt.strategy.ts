import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentService } from '@Package/config';
import {StrategyConstant} from "@Package/auth/passport/strategy/strategy.constant";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, StrategyConstant.jwt) {

  constructor(
    private readonly environmentService: EnvironmentService,
  ) {
    const secretKey = environmentService.get('jwt.jwtAccessSecret');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
      passReqToCallback: true,
    });

  }

  validate(req: Request, payload: any) {
    return payload
  }

}