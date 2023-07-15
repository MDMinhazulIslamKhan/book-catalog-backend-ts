import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../../config";
import { IUser, ReadingStatus, UserModel } from "./auth.interface";

const userSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    wishList: [
      {
        book: {
          type: Schema.Types.ObjectId,
          ref: "Book",
        },
      },
    ],
    bookList: [
      {
        book: {
          type: Schema.Types.ObjectId,
          ref: "Book",
          require: true,
        },
        status: {
          type: String,
          enum: ReadingStatus,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

/*---        static method below            ---*/
userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, "email" | "password"> | null> {
  return await User.findOne({ email }, { email: 1, password: 1 });
};

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savePassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savePassword);
};

userSchema.pre("save", async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

const User = model<IUser, UserModel>("User", userSchema);

export default User;
