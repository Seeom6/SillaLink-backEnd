import * as joi from 'joi'
import { IDevEnv } from '../environments/dev.env';
import {loadEnv} from "../environment.service";
import { IDatabaseEnv } from '../interfaces/database.inteface';
import { IAppEnv } from '../interfaces/app.interface';

export const devValidationSchema =()=>{
  console.log(loadEnv())
  const schema =joi.object<IDevEnv>({
    app: joi.object<IAppEnv>({
      port: joi.number().required(),
      host: joi.string().required(),
      name: joi.string().required()
    }).required(),
    mongodb: joi.object<IDatabaseEnv>({
      host: joi.string().required(),
      port: joi.number().required(),
      password: joi.string().required(),
      username: joi.string().required(),
      name: joi.string().required(),
    }).required(),
    jwt:  joi.object({
      jwtAccessToken: joi.string().required(),
      jwtRefreshToken: joi.string(),
      jwtExpiredRefresh: joi.string(),
      jwtExpiredAccess: joi.string().required()
    }).required(),
    mail: joi.object({
      host: joi.string().required(),
      port: joi.number().required(),
      user: joi.string().required(),
      password: joi.string().required(),
      from: joi.string()
    }).required()
  })
  console.log(schema.validate(loadEnv()))
  return joi.object<IDevEnv>({
    app: joi.object<IAppEnv>({
      port: joi.number().required(),
      host: joi.string().required(),
      name: joi.string().required()
    }).required(),
    mongodb: joi.object<IDatabaseEnv>({
      host: joi.string().required(),
      port: joi.number().required(),
      password: joi.string().required(),
      username: joi.string().required(),
    }).required(),
    jwt:  joi.object({
      jwtAccessToken: joi.string().required(),
      jwtRefreshToken: joi.string(),
      jwtExpiredRefresh: joi.string(),
      jwtExpiredAccess: joi.string().required()
    }).required(),
    mail: joi.object({
      host: joi.string().required(),
      port: joi.number().required(),
      user: joi.string().required(),
      password: joi.string().required(),
      from: joi.forbidden()
    }).required()
  })
}


