import Prototypes from "prop-types";

export class ApiResultModel {
    success; data; message;
    constructor(success, data, message) {
        this.success = success;
        this.data = data;
        this.message = message;
    }
}

ApiResultModel.protoTypes= {
    success: Prototypes.bool.isRequired,
    data: Prototypes.any,
    message: Prototypes.string
};