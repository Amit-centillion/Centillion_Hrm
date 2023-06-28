import httpStatus from "http-status";
import { Inject, Service } from "typedi";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { ERRORS } from "../../../constants/error.constant";
import {
  IAuthRequest,
  IChangePasswordRequest,
  ILoggedInUser,
} from "../../../interfaces/IUsers";
import config from "../../../config";
import moment from "moment";

@Service()
export default class AuthService {
  constructor(
    @Inject("User") private User: Models.User,
    @Inject("AuthToken") private AuthToken: Models.AuthToken
  ) {}
  async login(payload: IAuthRequest) {
    try {
      const user = await this.User.findOne({
        email: payload.email,
      }).populate({ path: "role", select: "name" });
      if (user) {
        const compare = compareSync(payload.password, user.password);
        if (compare) {
          const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            _id: user?._id,
          };
          const token = jwt.sign(data, config.secrets.jwt, {
            expiresIn: `${config.secrets.jwt_expirty}h`,
          });

          let authToken = await this.AuthToken.findOne({ user: user?._id });
          if (authToken) {
            jwt.verify(authToken.token, config.secrets.jwt, (error, token) => {
              if (!token) {
                authToken.delete();
                authToken = null;
              }
            });
          }
          if (!authToken) {
            await this.AuthToken.create({
              token,
              user: user?._id,
              expiryAt: moment()
                .add(Number(config.secrets.jwt_expirty), "hours")
                .toISOString(),
              device: payload.device,
            });
            return {
              status: true,
              data,
              token,
            };
          } else {
            throw {
              status: httpStatus.FORBIDDEN,
              message: ERRORS.USER_ALREADY_LOGGEDIN,
            };
          }
        } else {
          throw {
            status: httpStatus.BAD_REQUEST,
            message: ERRORS.INVALID_CREDENTIALS,
          };
        }
      } else {
        throw {
          status: httpStatus.BAD_REQUEST,
          message: ERRORS.USER_NOT_FOUND,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(payload) {
    try {
      const auth_token = await this.AuthToken.findOne({
        user: payload.id,
      }).populate({ path: "user", select: ["firstName", "lastName", "email"] });

      if (auth_token) {
        return jwt.verify(
          auth_token.token,
          config.secrets.jwt,
          (error, token) => {
            if (token) {
              return {
                status: true,
                data: auth_token,
              };
            } else {
              return {
                status: false,
              };
            }
          }
        );
      } else {
        return {
          status: false,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async logout(payload) {
    try {
      await this.AuthToken.deleteMany({ user: payload.id });
      return {
        status: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserProfile(payload: ILoggedInUser) {
    try {
      const user = await this.User.findOne({ _id: payload?._id })
      .populate([{ path: "designation" }, { path: "department" }])
      .select(["-password"]);
      console.log('user ----------- ',user );
      if (user) { 
        return {
          status: true,
          details: user,
        };
      } else {
        throw {
          status: httpStatus.BAD_REQUEST,
          message: ERRORS.USER_NOT_FOUND,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async changePassword(payload: IChangePasswordRequest, user: ILoggedInUser) {
    try {
      const employee = await this.User.findOne({ _id: user?._id });
      if (employee) {
        if (compareSync(payload.oldPassword, employee.password)) {
          if (!compareSync(payload.newPassword, employee.password)) {
            if (payload.newPassword === payload.confirmPassword) {
              await this.User.findOneAndUpdate(
                { _id: user._id },
                { password: hashSync(payload.newPassword, 10) },
                { upsert: true, new: true }
              );
              return {
                status: true,
              };
            } else {
              throw {
                status: httpStatus.BAD_REQUEST,
                message: ERRORS.NEW_PASSWORD_MATCHED,
              };
            }
          } else {
            throw {
              status: httpStatus.BAD_REQUEST,
              message: ERRORS.NEW_PASSWORD_MATCHED,
            };
          }
        } else {
          throw {
            status: httpStatus.BAD_REQUEST,
            message: ERRORS.OLD_PASSWORD_NOT_MATCHED,
          };
        }
      } else {
        throw {
          status: httpStatus.BAD_REQUEST,
          message: ERRORS.USER_NOT_FOUND,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
