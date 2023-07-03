import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get("/", (req, res, next) => {
  try {
    const fighters = fighterService.getAllFighters()
    if (fighters) {
      req.body = {
          fighters,
      };
      return req.body;
    }
  } catch (error) {
    return (req.body = {
      error: true,
      type: 400,
      message: message,
  });
  } finally {
    next()
  }
}, responseMiddleware)

router.post("/", createFighterValid, (req, res, next) => {
  try {
    const { error, type, message, ...data } = req.body;
    if (error) {
        throw (type, message);
    }
    const fighter = fighterService.createFighter(data)
    if (fighter) {
      req.body = {
          fighter,
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
      const fighter = fighterService.search(search)
      if (!fighter) {
        return (req.body = {
          error: true,
          type: 404,
          message: `The fighter with id ${search} doesn't exist`,
      });
      } else if (fighter){
        req.body = {
            fighter,
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
  .put(updateFighterValid, (req, res, next) => {
    const id = req.params.id
    try {
      const { error, type, message, ...dataToUpdate } = req.body;
      if (error) {
          throw (type, message);
      }
      const fighter = fighterService.updateFighter(id, dataToUpdate)
      if (!fighter) {
        return (req.body = {
          error: true,
          type: 404,
          message: `The fighter with id ${search} doesn't exist`,
      })
      } else if (fighter) {
        req.body = {
            fighter,
        };
        return req.body;
      }
    } catch (error) {
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
      const fighter = fighterService.deleteteFighter(id)
      if (!fighter) {
        return (req.body = {
          error: true,
          type: 404,
          message: `The fighter with id ${search} doesn't exist`,
      });
      } else if (fighter) {
        req.body = {
            fighter,
        };
        return req.body;
      }
    } catch (error) {
      return (req.body = {
        error: true,
        type: 400,
        message,
    });
    } finally {
      next()
    }
  }, responseMiddleware)

export { router };
