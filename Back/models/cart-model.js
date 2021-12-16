const Joi = require("joi");  

class CartModel {

    constructor(cart) {
        this.CartID = cart.CartID;
        this.UserUUID = cart.UserUUID;
        this.Date = cart.Date;
    }

    static #UUIDcardValidationSchema = Joi.object({
        UserUUID: Joi.string().required().min(36).max(36),
        CartID: Joi.forbidden(),
        Date: Joi.forbidden(),     
    })

    static #IDValidationSchema = Joi.object({
        UserUUID: Joi.forbidden(),
        CartID: Joi.number().positive().integer().required(),
        Date: Joi.forbidden(),     
    })

    static #postValidationSchema = Joi.object({  
        UserUUID: Joi.string().required().min(36).max(36),
        Date: Joi.date().required(),
        CartID: Joi.forbidden()
    });

    validatePost() {
        const result = CartModel.#postValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null;
    }

    validateUUID() {
        const result = CartModel.#UUIDcardValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; 
    }

    validateID() {
        const result = CartModel.#IDValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; 
    }
}

module.exports = CartModel;

