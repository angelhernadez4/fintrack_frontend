import { Observable } from "rxjs";

export type GetOne<T> = T | ErrorsMap.ELEMENT_NOT_EXIST | null;
export type SuccessObs = Observable<boolean>;
export type GetOneObs<T> = Observable<GetOne<T>>;
export type GetAllObs<T> = Observable<T[] | null>;

export interface GenericBackendResponse {
    success: boolean;
    message: string;
}

export interface Timestamps {
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
}

export enum ErrorsMap {
    ELEMENT_NOT_EXIST = 'elementNotExist',
}