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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = __importDefault(require("../user/user.model"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.default.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User doesn't exist.");
    }
    if (!(yield user_model_1.default.isPasswordMatch(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect.");
    }
    const { email: userEmail } = isUserExist;
    //   create token
    const token = jwtHelpers_1.jwtHelpers.createToken({ email: userEmail }, config_1.default.jwt.secret, config_1.default.jwt.expire_in);
    return {
        token,
    };
});
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const checkEmail = yield user_model_1.default.findOne({ email: user.email });
    if (checkEmail) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Already used this email!!!");
    }
    const createdUser = yield user_model_1.default.create(user);
    if (!createdUser) {
        throw new ApiError_1.default(400, "Failed to create user!");
    }
    const result = yield user_model_1.default.findById(createdUser._id);
    const token = jwtHelpers_1.jwtHelpers.createToken({ email: result === null || result === void 0 ? void 0 : result.email }, config_1.default.jwt.secret, config_1.default.jwt.expire_in);
    return { result, token };
});
exports.AuthService = {
    loginUser,
    createUser,
};
