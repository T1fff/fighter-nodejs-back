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
      type: 404,
      message,
  });
  } finally {
    next()
  }
}, responseMiddleware)

router.post("/", (req, res, next) => {
  const data = req.body
  try {
    const fighter = fighterService.createFighter(data)
    if (fighter) {
      req.body = {
          fighter,
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
      const fighter = fighterService.updateFighter(id, dataToUpdate)
      if (fighter) {
        req.body = {
            fighter,
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
      const fighter = fighterService.deleteteFighter(id)
      if (fighter) {
        req.body = {
            fighter,
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

export { router };
