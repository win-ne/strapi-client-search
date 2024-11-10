import { Category, Service, Showcase } from "./content-types";

export type StrapiError = {
    error: {
        message: string;
        [key: string]: string | number | object | boolean;
    }
    [key: string]: string | number | object | boolean;
}

export type RequestResponse = Promise<[StrapiError | Category | Service | Showcase | Category[] | Service[] | Showcase[], boolean]>