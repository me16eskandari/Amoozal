import Prototypes from "prop-types";

export class UserModel {
    id;
    email;
    firstname;
    lastname;
    avatar;
    
    constructor(id, email, firstname, lastname, avatar) {
        this.id = id;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.avatar = avatar;
    }
}

UserModel.protoTypes = {
    id: Prototypes.number.isRequired,
    email: Prototypes.string.isRequired,
    firstname: Prototypes.string.isRequired,
    lastname: Prototypes.string.isRequired,
    avatar: Prototypes.string,
};