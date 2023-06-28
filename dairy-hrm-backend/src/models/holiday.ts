import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { HOLIDAY_TYPES, types } from "../enums/weekends.enum";
import { IHolidays } from "../interfaces/IHolidays";

const HolidaySchema = new Schema(
  {
    name: {
      type: String,
    },
    holidayDate: {
      type: Date,
    },
    day: {
      type: String,
    },
    type: {
      type: String,
      enum: types(),
      default: HOLIDAY_TYPES.FIXED,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

HolidaySchema.plugin(paginate);

export default model<IHolidays & PaginateModel<IHolidays>>(
  "holidays",
  HolidaySchema
);
