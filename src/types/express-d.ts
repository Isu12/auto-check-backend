import { IUser } from './user.interface'; // Import the IUser interface

declare global {
  namespace Express {
    interface Request {
      user: IUser; // This tells TypeScript that `req.user` will be of type `IUser`
    }
  }
}
