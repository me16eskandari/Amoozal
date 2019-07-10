import Prototypes from "prop-types";

import { UserModel } from "./userModel";

export class UserList {
    page;
    perPage;
    total;
    totalPages;
    data;
    constructor(page, perPage, total, totalPages, users) {
        this.page = page;
        this.perPage = perPage;
        this.total = total;
        this.totalPages = totalPages;
        this.data = users;
    }
}

UserList.protoTypes = {
    page: Prototypes.number.isRequired,
    perPage: Prototypes.number.isRequired,
    total: Prototypes.number.isRequired,
    totalPages: Prototypes.number.isRequired,
    data: Prototypes.arrayOf(UserModel.protoTypes),
};