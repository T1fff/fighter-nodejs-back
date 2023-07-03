import { Router } from "express"
import { userService } from "../services/userService.js"
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js"
import { responseMiddleware } from "../middlewares/response.middleware.js"

const router = Router()

// TODO: Implement route controllers for user

router.get("/", (req, res, next) => {
  try {
    const users = userService.getAllUsers()
    if (users) {
      req.body = {
          users,
      };
      return req.body;
    }
  } catch (message) {
    return (req.body = {
      error: true,
      type: 400,
      message: message,
  });
  } finally {
    next()
  }
}, responseMiddleware)

router.post("/", createUserValid, (req, res, next) => {
  try {
    const { error, type, message, ...data } = req.body;
    if (error) {
        throw (type, message);
    }
    const user = userService.createUser(data)
    if (user) {
      req.body = {
          user,
      };
      return req.body;
    }
  } catch (message) {
    return (req.body = {
      error: true,
      type: 400,
      message: message,
  });
  } finally {
    next()
  }
}, responseMiddleware)

router
  .route("/:id")
  .get((req, res, next) => {
    const search = req.params.id
    try {
      const user = userService.search(search)
      if (!user) {
        return (req.body = {
          error: true,
          type: 404,
          message: `The user with id ${search} doesn't exist`,
      });
      } else if (user){
        req.body = {
            user,
        };
        return req.body;
      }
    } catch (message) {
      return (req.body = {
        error: true,
        type: 400,
        message: message,
    });
    } finally {
      next()
    }
  },  responseMiddleware )
  .put(updateUserValid, (req, res, next) => {
    const id = req.params.id
    try {
      const { error, type, message, ...dataToUpdate } = req.body;
      if (error) {
          throw (type, message);
      }
      const user = userService.updateUser(id, dataToUpdate)
      if (!user) {
        return (req.body = {
          error: true,
          type: 404,
          message: `The fighter with id ${search} doesn't exist`,
      })}else if (user) {
        req.body = {
            user,
        };
        return req.body;
      }
    } catch (message) {
      return (req.body = {
        error: true,
        type: 400,
        message: message,
    });
    } finally {
      next()
    }
  }, responseMiddleware)
  .delete((req, res, next) => {
    const id = req.params.id
    try {
      const user = userService.deleteteUser(id)
      if (user) {
        req.body = {
            user,
        };
        return req.body;
      }
    } catch (message) {
      return (req.body = {
        error: true,
        type: 400,
        message: message,
    });
    } finally {
      next()
    }
  }, responseMiddleware)

export { router }
