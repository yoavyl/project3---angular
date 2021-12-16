const Joi = require("joi");      

class OrderModel {

    constructor(order) {
        this.OrderID = order.OrderID;
        this.CartID = order.CartID;
        this.UserUUID = order.UserUUID;
        this.TotalPrice = order.TotalPrice;
        this.Date = order.Date;
        this.City = order.City;
        this.Street = order.Street;
        this.Delivery = order.Delivery;
        this.CreditCard = order.CreditCard;
    }

    static #uuidValidationSchema = Joi.object({
        OrderID: Joi.forbidden(),
        CartID: Joi.forbidden(),
        TotalPrice: Joi.forbidden(),
        UserUUID: Joi.string().required().min(36).max(36),
        Date: Joi.forbidden(),
        City: Joi.forbidden(),
        Street: Joi.forbidden(),
        Delivery: Joi.forbidden(),
        CreditCard: Joi.forbidden(),
    })

    static #postValidationSchema = Joi.object({   
        OrderID: Joi.forbidden(), 
        CartID: Joi.number().required().positive().integer(),  
        TotalPrice: Joi.number().required().positive(),
        UserUUID: Joi.string().required().min(36).max(36),
        Date: Joi.date().required(),       
        Delivery: Joi.date().required(),
        City: Joi.string().required(),        
        Street: Joi.string().required(), 
        CreditCard: Joi.string().min(4).max(4).required(), 
    });

    validatePost() {
        const result = OrderModel.#postValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null;
    }

    validateUUID() {
        const result = OrderModel.#uuidValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; 
    }
}

module.exports = OrderModel;

