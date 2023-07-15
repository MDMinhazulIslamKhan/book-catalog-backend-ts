import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { ILoginUser, ILoginUserResponse, IUser } from "./auth.interface";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import User from "./auth.model";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist.");
  }

  if (!(await User.isPasswordMatch(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect.");
  }

  const { email: userEmail } = isUserExist;
  //   create token

  const token = jwtHelpers.createToken(
    { email: userEmail },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  return {
    token,
  };
};

const createUser = async (
  user: IUser
): Promise<{ result: IUser | null; token: string }> => {
  const checkEmail = await User.findOne({ email: user.email });

  if (checkEmail) {
    throw new ApiError(httpStatus.CONFLICT, "Already used this email!!!");
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, "Failed to create user!");
  }
  const result = await User.findById(createdUser._id);

  const token = jwtHelpers.createToken(
    { email: result?.email },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  return { result, token };
};

export const AuthService = {
  loginUser,
  createUser,
};
