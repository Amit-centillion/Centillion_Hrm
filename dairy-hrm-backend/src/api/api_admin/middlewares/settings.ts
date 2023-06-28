import { Inject, Service } from "typedi";
import {
  IUpdateAllPayrollSettingRequest,
  IUpdatePayrollSettingRequest,
} from "../../../interfaces/IPayrollSettings";

@Service()
export default class SettingsService {
  constructor(
    @Inject("PayrollSettings") private PayrollSettings: Models.PayrollSettings
  ) {}

  async getPayroll() {
    try {
      const payroll = await this.PayrollSettings.find({});
      return {
        status: true,
        payroll,
      };
    } catch (error) {}
  }

  async updatePayroll(payload: IUpdatePayrollSettingRequest) {
    try {
      await this.PayrollSettings.create(payload);
      return { status: true };
    } catch (error) {
      throw error;
    }
  }

  async updateAllPayroll(payload: IUpdateAllPayrollSettingRequest[]) {
    try {
      for (const payroll of payload) {
        await this.PayrollSettings.findOneAndUpdate(
          { _id: payroll._id },
          { settings: payroll.settings },
          { upsert: true, new: true }
        );
      }
      return {
        status: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
