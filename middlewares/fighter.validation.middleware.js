import { FIGHTER } from "../models/fighter.js"
import { fighterService } from "../services/fighterService.js"
fighterService

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  try {
    const { name, power, health = 100, defense } = req.body
    const nameExist = fighterService.searchName({ name: name })

    if (!name || !power || !defense) {
      throw new Error("Validation Failed. Complete all the fields.")
    } else if (!!nameExist) {
      throw new Error("Fighter Already in the database")
    } else if (defense <= 1 || defense >= 10) {
      throw new Error("Defense should be more than 1 and less than 10")
    } else if (power <= 1 || power >= 100) {
      throw new Error("Power sould be more than 1 and less than 100")
    } else if (health <= 60 || health >= 120) {
      throw new Error("Health should be more than 1 and less than 100")
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
}

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  try {
    const { name, power, health = 100, defense } = req.body

    if (!name && !power && !defense) {
      throw new Error("Validation Failed. Complete at least one field.")
    } else if (name && !!nameExist) {
      throw new Error("Fighter Already in the database")
    } else if (defense && (defense <= 1 || defense >= 10)) {
      throw new Error("Defense should be more than 1 and less than 10")
    } else if (power && (power <= 1 || power >= 100)) {
      throw new Error("Power sould be more than 1 and less than 100")
    } else if (health && (health <= 60 || health >= 120)) {
      throw new Error("Health should be more than 1 and less than 100")
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
}

export { createFighterValid, updateFighterValid }
