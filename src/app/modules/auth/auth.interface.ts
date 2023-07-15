import { Model } from "mongoose";

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  token: string;
};

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  email: string;
  password: string;
  name: UserName;
};

export type UserModel = {
  isUserExist(phoneNumber: string): Promise<Pick<IUser, "email" | "password">>;
  isPasswordMatch(
    givenPassword: string,
    savePassword: string
  ): Promise<boolean>;
} & Model<IUser>;
