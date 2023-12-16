import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userSchema from './user.validation';
import { TOrder } from './user.interface';


// Create User
const createUser = async (req: Request, res: Response) => {
  try {
  const userData = req.body;
  const result = await UserServices.createUserIntoDB(
    userSchema.parse(userData)
  );

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Is Wrong',
      error: err,
    });
  }
};

// Get all user
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// get single user
const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Is Wrong',
      error: err,
    });
  }
};

// a single user deleted
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found', data: null });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Something went wrong', error: err });
  }
};

// single user updated
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body;
    const result = await UserServices.updateUserInDB(userId, updatedUserData);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found', data: null });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'User not found', error: err });
  }
};


// Add Order to User
const addOrderToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData: TOrder = req.body;

    await UserServices.addOrderToUser(userId, orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Is Wrong',
      error: err,
    });
  }
};

const getAllOrdersForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getAllOrdersForUser(userId);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Is Wrong',
      error: err,
    });
  }
};

const calculateTotalPriceForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.calculateTotalPriceForUser(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Is Wrong',
      error: err,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUsers,
  deleteUser,
  updateUser,
  addOrderToUser,
  getAllOrdersForUser,
  calculateTotalPriceForUser,
};
