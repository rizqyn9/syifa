const Joi = require('joi')

exports.signUpValidate = data => { 
    let schema = Joi.object({
        name : Joi.string()
            .required(),
        email : Joi.string()
            .required()
            .email(),
        password : Joi.string()
            .required(),
        is_Admin : Joi.boolean()
            .required()
    })
    return schema.validate(data)
}
exports.logInValidate = data => { 
    let schema = Joi.object({
        name : Joi.string()
            .required(),
        password: Joi.string()
            .required()
    })
    return schema.validate(data)
}