import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { StrategyConstant } from "@Package/auth";
import { EnvironmentService } from "@Package/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, StrategyConstant.refresh_Token) {

  constructor(
    private readonly environmentService: EnvironmentService,
  ) {
    const secretKey = environmentService.get('jwt.jwtAccessToken');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() ,
      ignoreExpiration: false,
      secretOrKey: secretKey,
      passReqToCallback: true,
    });
  }

  validate(...args: any[]): unknown {
    throw new Error("Method not implemented.");
  }
}