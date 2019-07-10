import axios from "axios";

import { ApiConfig } from "../consts";
import { ApiResultModel } from "../models";


export class HttpService {

    static baseUrl = `${ApiConfig.protocol}${ApiConfig.baseUrl}`;

    static getConfig = (url, method, data = undefined) =>  ({
        baseURL: HttpService.baseUrl,
        url: url,
        method: method,
        data: data,
    });

    static get = async (url) => {
        try {
            let reqCongif = HttpService.getConfig(url, "GET");
            let response = await axios(reqCongif);
            return new ApiResultModel(true, response.data, null);
        }
        catch (e) {
            return new ApiResultModel(false, "error", null);
        }
    }

    static delete = async (url) => {
        try {
            let reqCongif = HttpService.getConfig(url, "DELETE");
            let response = await axios(reqCongif);
            return new ApiResultModel(true, response.data, null);
        }
        catch (e) {
            return new ApiResultModel(false, "error", null);
        }
    }

    static post = async (url, data) => {
        try {
            let reqCongif = HttpService.getConfig(url, "POST", data);
            let response = await axios(reqCongif);
            return new ApiResultModel(true, response.data, null);
        }
        catch (e) {
            return new ApiResultModel(false, "error", null);
        }
    }

    static put = async (url, data) => {
        try {
            let reqCongif = HttpService.getConfig(url, "PUT", data);
            let response = await axios(reqCongif);
            return new ApiResultModel(true, response.data, null);
        }
        catch (e) {
            return new ApiResultModel(false, "error", null);
        }
    }
}