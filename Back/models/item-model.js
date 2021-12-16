const Joi = require("joi");   

class CartItemModel {

    constructor(item) {
        this.CartID = item.CartID;
        this.ProductID = item.ProductID;
        this.Quantity = item.Quantity;
        this.TotalPrice = item.TotalPrice;
        this.ItemID = item.ItemID;
        this.ProductName = item.ProductName
    }

    static #cartIdValidationSchema = Joi.object({
        CartID: Joi.number().required().positive().integer(),
        ProductID: Joi.forbidden(),
        Quantity: Joi.forbidden(),
        TotalPrice: Joi.forbidden(),
        ItemID: Joi.forbidden(),
        ProductName: Joi.forbidden()
    })

    static #idValidationSchema = Joi.object({
        CartID: Joi.forbidden(),
        ProductID: Joi.forbidden(),
        Quantity: Joi.forbidden(),
        TotalPrice: Joi.forbidden(),
        ItemID: Joi.number().required().positive().integer(),
        ProductName: Joi.forbidden()

    })

    static #postValidationSchema = Joi.object({    
        ProductID: Joi.number().positive().integer().required(),
        TotalPrice: Joi.number().positive().required(), 
        Quantity: Joi.number().positive().required(), 
        CartID: Joi.number().positive().integer().required(),
        ItemID: Joi.forbidden(),
        ProductName: Joi.forbidden()
    })

    validatePost() {
        const result = CartItemModel.#postValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; 
    }

    validateCartID() {
        const result = CartItemModel.#cartIdValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; 
    }

    validateID() {
        const result = CartItemModel.#idValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; 
    }
}

module.exports = CartItemModel;

