import { Url } from "src/app/global/models/url";


export interface UrlsState {
  urls: Url[];
}

export const initialState: UrlsState = {
  urls: [],
};
