import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

// Create a user
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  const result = await User.create(userData);
  return result;
};

// Get all User From DB
const getAllUserFromDB = async () => {
  const result = await User.find();

  if (!result) {
    throw new Error('Users not found');
  }
  const userAllDataWithoutPassword = result.map((user) => {
    const { password, ...userDataWithoutPassword } = user.toObject();
    return userDataWithoutPassword;
  });

  return userAllDataWithoutPassword;
};

// Get Single User From DB
const getSingleUserFromDB = async (userId: string) => {
  const existingUser: any = await User.isUserExists(userId);

  if (!existingUser) {
    throw new Error('User not found');
  }
  const { password, ...userDataWithoutPassword } = existingUser.toObject();

  return userDataWithoutPassword;
};

// Update User
const updateUserInDB = async (userId: number, updatedUserData: TUser) => {
  const existingUser = await User.isUserExists(userId);

  if (!existingUser) {
    throw new Error('User not found');
  }
  const { password, ...updatedDataWithoutPassword } = updatedUserData;
  const result = await User.findOneAndUpdate(
    { userId },
    updatedDataWithoutPassword,
    {
      new: true,
    }
  );

  if (!result) {
    throw new Error('Failed to update user');
  }
  const { password: updatedPassword, ...updatedUserDataWithoutPassword } =
    result.toObject();

  return updatedUserDataWithoutPassword;
};

// Deleted User From DB
const deleteUserFromDB = async (userId: string) => {
  const result = await User.findOneAndDelete({ userId });
  return result;
};

// Order Section ----
// Add Order to User
const addOrderToUser = async (userId: string, orderData: TOrder) => {
  const existingUser = await User.isUserExists(userId);

  if (!existingUser) {
    throw new Error('User not found');
  }

  if (!existingUser.orders) {
    existingUser.orders = [];
  }

  existingUser.orders.push(orderData);
  await existingUser.save();

  return null;
};

// Get all Order
const getAllOrdersForUser = async (userId: string) => {
  const existingUser = await User.isUserExists(userId);

  if (!existingUser) {
    throw new Error('User not found');
  }

  const orders = existingUser.orders || [];

  return { orders };
};

// User Order Calculate
const calculateTotalPriceForUser = async (userId: string) => {
  const existingUser = await User.isUserExists(userId);

  if (!existingUser) {
    throw new Error('User not found');
  }

  // Calculate the total price of the user's orders
  const total = existingUser.orders
    ? existingUser.orders.reduce(
        (acc, order) => acc + order.price * order.quantity,
        0
      )
    : 0;

  return { totalPrice: total };
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserInDB,
  addOrderToUser,
  getAllOrdersForUser,
  calculateTotalPriceForUser,
};
