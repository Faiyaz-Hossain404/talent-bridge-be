import { TUser } from "./user.types";

declare global {
  namespace Express {
    interface Request {
      user?: TUser;
    }
  }
}
