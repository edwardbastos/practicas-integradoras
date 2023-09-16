import userModel from '../models/users.js';

//Cada manager es consciente de qué PERSISTENCIA está utilizando.
export default class UserManager {

    get = () =>{
        //Va a traer a todos los users desde la base
        return userModel.find().lean();
    }

    getBy = (param) =>{
        return userModel.findOne(param).lean();
    }

    create = (user) =>{
        return userModel.create(user);
    }
}
