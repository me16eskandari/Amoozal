import { ApiUrls } from "../consts/apiUrls";
import { UserList, UserModel } from "../models";
import { HttpService } from "./httpService";

export class UsersService {

    static listUsers = async (page, per_page = 10) => {
        const url = ApiUrls.Users.List(page, per_page);
        const response = await HttpService.get(url);
        if (!response.success) return null;

        const data = response.data;
        const users = data.data.map((x) => new UserModel(x.id, x.email, x.first_name, x.last_name, x.avatar));
        return new UserList(data.page, data.per_page, data.total, data.total_pages, users);

    }

    static getUser = async (usreId) => {
        const url = ApiUrls.Users.Get(usreId);
        const response = await HttpService.get(url);

        if (!response.success) return null;

        const data = response.data.data;
        return new UserModel(data.id, data.email, data.first_name, data.last_name, data.avatar);
    }

    static addUser = async (usreId, user) => {
        const url = ApiUrls.Users.Add();
        return await HttpService.post(url, user);
    }

    static updateUser = async (usreId, user) => {
        const url = ApiUrls.Users.Get(usreId);
        return await HttpService.put(url, user);
    }

}