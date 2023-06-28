import { hashSync } from "bcrypt";
import config from "../config";
import { DEFAULT_MENUS, DEFAULT_ROLES, ROLES } from "../constants";
import { IUser } from "../interfaces/IUsers";
import Menu from "../models/menu";
import Role from "../models/roles";
import User from "../models/user";

export default async () => {
  const adminUser: IUser = await User.findOne({ email: "admin@gmail.com" });
  if (!adminUser) {
    const roles = await Role.find({});
    if (!roles?.length) {
      await Role.insertMany(DEFAULT_ROLES);
    }
    const adminRole = await Role.findOne({ name: ROLES.ADMIN });
    await User.create({
      firstName: config.admin.firstName,
      lastName: config.admin.lastName,
      email: config.admin.email,
      password: hashSync(config.admin.password, 10),
      role: adminRole._id,
    });

    const menus = await Menu.find({});
    if (!menus?.length) {
      for (const menu of DEFAULT_MENUS) {
        Menu.create({ ...menu, roles: [adminRole._id] });
      }
    }
  }
};
