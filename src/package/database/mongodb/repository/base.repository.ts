import * as mongoose from "mongoose";
import { HttpException, HttpStatus } from "@nestjs/common";

import { BaseMongoInterface, VDocument } from "../interface";
import {
  Document,
  MongooseBaseQueryOptions,
  MongooseUpdateQueryOptions,
} from "mongoose";
import mongodb from "mongodb";
import { IError } from "@Package/error";

export abstract class BaseMongoRepository<V>
  implements BaseMongoInterface<V>
{
  protected constructor(private readonly entityModel: mongoose.Model<V>) {}

  async create({
    doc,
    options,
    needResult = false,
  }: {
    doc: VDocument<V>;
    options?: mongoose.SaveOptions;
    needResult?: boolean;
  }): Promise<mongoose.Require_id<VDocument<V>>["_id"]> {
    const result = await new this.entityModel(doc).save(options);
    return needResult ? result : result._id;
  }

  async countDocuments({
    filter,
    options,
  }: {
    filter?: mongoose.RootFilterQuery<VDocument<V>>;
    options?: (mongodb.CountOptions & MongooseBaseQueryOptions<VDocument<V>>) | null;
  }) {
    return await this.entityModel.countDocuments(filter, options);
  }

  async aggregate({
    pipeline,
    options,
  }: {
    pipeline?: mongoose.PipelineStage[];
    options?: mongoose.AggregateOptions;
  }) {
    return this.entityModel.aggregate(pipeline, options);
  }

  async find({
    filter,
    projection,
    options,
  }: {
    filter?: mongoose.FilterQuery<VDocument<V>>;
    projection?: mongoose.ProjectionType<VDocument<V>>;
    options?: mongoose.QueryOptions;
  }) {
    return this.entityModel.find(filter, projection, {
      ...options,
      lean: true,
    }) as unknown as VDocument<V>[];
  }

  async findOne({
    filter,
    projection,
    options,
    error,
    throwError = true,
  }: {
    filter?: mongoose.FilterQuery<VDocument<V>>;
    projection?: mongoose.ProjectionType<VDocument<V>>;
    options?: mongoose.QueryOptions<VDocument<V>>;
    error: IError;
    throwError?: boolean;
  }): Promise<VDocument<V>> {
    const result = await this.entityModel.findOne(filter, projection, {
      ...options,
      lean: true,
    });
    if (!result && throwError) {
      throw new HttpException({ error }, HttpStatus.NOT_FOUND);
    }
    return result as VDocument<V>;
  }

}
