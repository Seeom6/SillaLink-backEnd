import * as mongoose from "mongoose";

import {
  MongooseBaseQueryOptions,
  MongooseUpdateQueryOptions,
  RootFilterQuery,
  Document
} from "mongoose";
import * as mongodb from "mongodb";
import { IError } from "@Package/error";

export type VDocument<V> = V & Document 

export interface BaseMongoInterface<V> {
  create({ doc, options }: { doc: V; options?: mongoose.SaveOptions });

  countDocuments({
    filter,
    options,
  }: {
    filter?: RootFilterQuery<VDocument<V>>;
    options?: (mongodb.CountOptions & MongooseBaseQueryOptions<VDocument<V>>) | null;
  });

  aggregate({
    pipeline,
    options,
  }: {
    pipeline?: mongoose.PipelineStage[];
    options?: mongoose.AggregateOptions;
  });

  find({
    filter,
    projection,
    options,
  }: {
    filter?: mongoose.FilterQuery<VDocument<V>>;
    projection?: mongoose.ProjectionType<VDocument<V>>;
    options?: mongoose.QueryOptions<VDocument<V>>;
  });

  findOne({
    filter,
    projection,
    options,
    error,
  }: {
    filter?: mongoose.FilterQuery<VDocument<V>>;
    projection?: mongoose.ProjectionType<VDocument<V>>;
    options?: mongoose.QueryOptions<VDocument<V>>;
    error: IError;
  });

}
