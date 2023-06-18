import joi from 'joi'

// signup validation schema
export const signUpSchema=joi.object({
    first_name: joi.string().alphanum().min(3).max(15).required(),
      last_name: joi.string().alphanum().min(3).max(15).required(),
      age: joi.number().min(15).max(80).required(),
      email: joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: joi.string().pattern(/^[A-Z]+[a-z]+[0-9]{6,}$/).required()
}).required()
// login schema
export const logInSchema=joi.object({
    email: joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().pattern(/^[A-Z]+[a-z]+[0-9]{6,}$/).required()
}).required()
