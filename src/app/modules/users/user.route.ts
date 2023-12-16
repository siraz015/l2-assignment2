import  express  from "express";
import { UserControllers } from "./user.controller";

const router = express.Router()

// user create route
router.post('/users', UserControllers.createUser);

// get all user route
router.get('/users', UserControllers.getAllUsers);

// get single user route
router.get('/users/:userId', UserControllers.getSingleUsers);

// deleted user route
router.delete('/users/:userId', UserControllers.deleteUser);

// update user route
router.put('/users/:userId', UserControllers.updateUser);

// Add Order to User route
router.put('/users/:userId/orders', UserControllers.addOrderToUser);

// single user order show route
router.get('/users/:userId/orders', UserControllers.getAllOrdersForUser);

// single order calculate route
router.get(
  '/users/:userId/orders/total-price',
  UserControllers.calculateTotalPriceForUser
);

  




export const UserRouter = router;