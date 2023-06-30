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
  } catch (error) {
    return (req.body = {
      error: true,
      type: 404,
      message,
  });
  } finally {
    next()
  }
}, responseMiddleware)

router.post("/", (req, res, next) => {
  const userData = req.body
  try {
    const user = userService.createUser(userData)
    if (user) {
      req.body = {
          user,
      };
      return req.body;
    }
  } catch (error) {
    return (req.body = {
      error: true,
      type: 404,
      message,
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
        type: 404,
        message,
    });
    } finally {
      next()
    }
  },  responseMiddleware )
  .put((req, res, next) => {
    const id = req.params.id
    const dataToUpdate = req.body
    try {
      const user = userService.updateUser(id, dataToUpdate)
      if (user) {
        req.body = {
            user,
        };
        return req.body;
      }
    } catch (error) {
      return (req.body = {
        error: true,
        type: 404,
        message,
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
    } catch (error) {
      return (req.body = {
        error: true,
        type: 404,
        message,
    });
    } finally {
      next()
    }
  }, responseMiddleware)

export { router }
