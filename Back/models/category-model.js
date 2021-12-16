const Joi = require("joi");      



class CategoryModel {

    constructor(Category) {
        this.CategoryID = Category.CategoryID;
        this.CategoryName = Category.CategoryName;
        this.Description = Category.Description
    }

    static #idValidationSchema = Joi.object({
        CategoryID: Joi.number().required().positive().integer(),
        CategoryName: Joi.forbidden(),
        Description: Joi.forbidden()
    })


    validateID() {
        const result = CategoryModel.#idValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; 
    }

}

module.exports = CategoryModel;

