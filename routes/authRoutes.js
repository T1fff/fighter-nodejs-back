import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
        try {
          const { email } = req.body;
          const user = authService.login({ email: email });
          if (!user) {
              throw new Error('user not found.');
          } else {
              req.body = {
                  ...user,
              };
          }
          } catch ({ message }) {
              return (req.body = {
                  error: true,
                  message,
              });
          } finally {
              next();
          }
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
