import {IPaginationRequest} from "@Package/api";

export type QueryValue<T> = Omit<T, keyof IPaginationRequest>
