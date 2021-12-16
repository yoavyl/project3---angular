const { forbidden } = require("joi");
const Joi = require("joi"); 

class UserModel {
    constructor(userObj) {
        this.firstName = userObj.firstName;
        this.lastName = userObj.lastName;
        this.password = userObj.password;
        this.idcard = userObj.idcard;
        this.email = userObj.email;
        this.city = userObj.city;
        this.street = userObj.street;
    }

    static #loginValidationSchema = Joi.object({
        firstName: Joi.string().forbidden(),
        lastName: Joi.string().forbidden(),
        email: Joi.string().email().required(),
        idcard: Joi.string().forbidden(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]+$")).min(8).max(16).required(),
        city: Joi.string().forbidden().forbidden(),
        street: Joi.string().forbidden()
    });

    static #registrationValidationSchema = Joi.object({
        firstName: Joi.string().pattern(new RegExp("^[A-Z].*")).min(2).required(),
        lastName: Joi.string().pattern(new RegExp("^[A-Z].*")).min(2).required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]+$")).min(8).max(16).required(),
        idcard: Joi.required(),
        email: Joi.string().email().required(),
        city: Joi.string().required(),
        street: Joi.string().required()
    });

    validateLogin() {
        const result = UserModel.#loginValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; 
    }

    validateRegistration() {
        const result = UserModel.#registrationValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; 
    }
    
}

module.exports = UserModel;