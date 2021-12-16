const { forbidden } = require("joi");
const Joi = require("joi");

class ProductModel {

    constructor(productObj) {
        // .id (Client field), .ProductID (DB field) - this way the model can be different than on the client/DB side
        // this.id = productObj.id ? productObj.id : productObj.ProductID;
        this.ProductID = productObj.ProductID;
        // this.name = productObj.name ? productObj.name : productObj.ProductName;
        this.ProductName = productObj.ProductName;
        // this.price = productObj.price ? productObj.price : productObj.UnitPrice;        
        this.UnitPrice = productObj.UnitPrice;
        // this.stock = productObj.stock ? productObj.stock : productObj.UnitsInStock;  
        this.CategoryID = productObj.CategoryID;

    }

    static #idValidationSchema = Joi.object({
        ProductID: Joi.number().required().positive().integer(),
        ProductName: Joi.forbidden(),
        UnitPrice: Joi.forbidden(),
        CategoryID: Joi.forbidden()
    });

    static #postValidationSchema = Joi.object({
        ProductID: Joi.forbidden(),
        ProductName: Joi.string().required().min(2).max(40),
        UnitPrice: Joi.number().required().min(2).max(100),
        CategoryID: Joi.number().optional().positive().integer()
    });

    static #putValidationSchema = Joi.object({
        ProductID: Joi.number().required().positive().integer(),
        ProductName: Joi.string().required().min(2).max(40),
        UnitPrice: Joi.number().required().min(2).max(100),
        CategoryID: Joi.number().required().positive().integer()
        // CategoryID: Joi.number().optional().positive().integer()


    });

    static #patchValidationSchema = Joi.object({
        ProductID: Joi.number().required().positive().integer(),
        ProductName: Joi.string().optional().min(2).max(40),
        UnitPrice: Joi.number().optional().min(2).max(100),
        CategoryID: Joi.number().optional().positive().integer()

    });

    validatePost() {
        const result = ProductModel.#postValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }

    validatePut() {
        const result = ProductModel.#putValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }

    validatePatch() {
        const result = ProductModel.#patchValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }

    validateID() {
        const result = ProductModel.#idValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.     
    }

}

module.exports = ProductModel;