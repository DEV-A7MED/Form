import { Router } from "express";
import * as authController from './auth.controller.js'
import * as validators from './auth.validation.js'
import { validation } from "../../MiddleWares/validation.js";
import { asyncHandler } from "../../Utils/errorHandling.js";
const router =Router()


// signUp router
    // api/auth/signUp
router.post("/signUp",validation(validators.signUpSchema),asyncHandler(authController.signUp))

//LOGIN ROUTER
    // api/auth/logIn
router.post("/logIn",validation(validators.logInSchema),asyncHandler(authController.logIn))


export default router