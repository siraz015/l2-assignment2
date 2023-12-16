"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
// Create a user
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userData.userId)) {
        throw new Error('User already exists');
    }
    const result = yield user_model_1.User.create(userData);
    return result;
});
// Get all User From DB
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    if (!result) {
        throw new Error('Users not found');
    }
    const userAllDataWithoutPassword = result.map((user) => {
        const _a = user.toObject(), { password } = _a, userDataWithoutPassword = __rest(_a, ["password"]);
        return userDataWithoutPassword;
    });
    return userAllDataWithoutPassword;
});
// Get Single User From DB
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.isUserExists(userId);
    if (!existingUser) {
        throw new Error('User not found');
    }
    const _a = existingUser.toObject(), { password } = _a, userDataWithoutPassword = __rest(_a, ["password"]);
    return userDataWithoutPassword;
});
// Update User
const updateUserInDB = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.isUserExists(userId);
    if (!existingUser) {
        throw new Error('User not found');
    }
    const { password } = updatedUserData, updatedDataWithoutPassword = __rest(updatedUserData, ["password"]);
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, updatedDataWithoutPassword, {
        new: true,
    });
    if (!result) {
        throw new Error('Failed to update user');
    }
    const _b = result.toObject(), { password: updatedPassword } = _b, updatedUserDataWithoutPassword = __rest(_b, ["password"]);
    return updatedUserDataWithoutPassword;
});
// Deleted User From DB
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndDelete({ userId });
    return result;
});
// Order Section ----
// Add Order to User
const addOrderToUser = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.isUserExists(userId);
    if (!existingUser) {
        throw new Error('User not found');
    }
    if (!existingUser.orders) {
        existingUser.orders = [];
    }
    existingUser.orders.push(orderData);
    yield existingUser.save();
    return null;
});
// Get all Order
const getAllOrdersForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.isUserExists(userId);
    if (!existingUser) {
        throw new Error('User not found');
    }
    const orders = existingUser.orders || [];
    return { orders };
});
// User Order Calculate
const calculateTotalPriceForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.isUserExists(userId);
    if (!existingUser) {
        throw new Error('User not found');
    }
    // Calculate the total price of the user's orders
    const total = existingUser.orders
        ? existingUser.orders.reduce((acc, order) => acc + order.price * order.quantity, 0)
        : 0;
    return { totalPrice: total };
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserInDB,
    addOrderToUser,
    getAllOrdersForUser,
    calculateTotalPriceForUser,
};
