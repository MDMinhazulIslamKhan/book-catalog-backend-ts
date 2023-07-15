import { Model, Types } from "mongoose";

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

export type Status = "Currently reading" | "Read soon" | "Finished reading";

export const ReadingStatus: Status[] = [
  "Currently reading",
  "Read soon",
  "Finished reading",
];

export type IUser = {
  email: string;
  password: string;
  name: UserName;
  wishList?: Array<{ book: Types.ObjectId }>;
  bookList?: Array<{ book: Types.ObjectId; status: Status }>;
};

export type UserModel = {
  isUserExist(phoneNumber: string): Promise<Pick<IUser, "email" | "password">>;
  isPasswordMatch(
    givenPassword: string,
    savePassword: string
  ): Promise<boolean>;
} & Model<IUser>;
