import { USER } from "../models/user.js";
import { userService } from "../services/userService.js"
userService
const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
  const phoneNumberRegex = /^\+380\d{9}$/;
  const passwordRegex = /^.{3,}$/;
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body
    const emailExist = userService.authSearch({ email: email })

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      throw new Error("Validation Failed. Complete all the fields.")
    } else if(!!emailExist){
      throw new Error("Email Already in the database")
    } else if(!emailRegex.test(email)){
      throw new Error("Validation Failed. Your email should end @gmail.com")
    } else if(!phoneNumberRegex.test(phoneNumber)){
      throw new Error("Validation Failed. Your number should be +380xxxxxxxxx")
    } else if(!passwordRegex.test(password)){
      throw new Error("Validation Failed. Your password should have at least 3 characters")
    } else {
      return req.body
    }
  } catch ({ message }) {
    req.body = {
      error: true,
      type: 400,
      message: message,
    }
    return req.body
  } finally {
    next()
  }
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
  const phoneNumberRegex = /^\+380\d{9}$/;
  const passwordRegex = /^.{3,}$/;
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body
    const emailExist = userService.authSearch({ email: email })

    if (!firstName && !lastName && !email && !phoneNumber && !password) {
      throw new Error("Validation Failed. Complete at least one field.")
    } else if(email && (!emailRegex.test(email || emailExist))){
      throw new Error("Validation Failed. Your email should end @gmail.com")
    } else if(phoneNumber && !phoneNumberRegex.test(phoneNumber)){
      throw new Error("Validation Failed. Your number should be +380xxxxxxxxx")
    } else if(password && !passwordRegex.test(password)){
      throw new Error("Validation Failed. Your password should have at least 3 characters")
    } else {
      return req.body
    }
  } catch ({ message }) {
    req.body = {
      error: true,
      type: 400,
      message: message,
    }
    return req.body
  } finally {
    next()
  }
};

export { createUserValid, updateUserValid };
