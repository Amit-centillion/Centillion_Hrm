import moment from "moment";
import { Inject, Service } from "typedi";
import { weekends } from "../../../enums/weekends.enum";
import { ILoggedInUser } from "../../../interfaces/IUsers";

@Service()
export default class EmployeeService {
  constructor(
    @Inject("Attendance") private Attendance: Models.Attendance,
    @Inject("UserEntries") private UserEntries: Models.UserEntries,
    @Inject("User") private User: Models.User,
    @Inject("Holiday") private Holiday: Models.Holiday
  ) {}

  async getSummary(payload: ILoggedInUser) {
    try {
      let totalWorkingDays = 0;
      let totalAbsentDays = 0;
      const attendance = await this.Attendance.findOne({
        user: payload._id,
        workDate: {
          $gte: moment().utc(true).startOf("day").toDate(),
          $lte: moment().utc(true).endOf("day").toDate(),
        },
      }).populate({ path: "entries" });

      const totalPresentDays = await this.Attendance.find({
        user: payload._id,
        workDate: {
          $gte: moment().utc(true).startOf("month").startOf("day").toDate(),
          $lte: moment().utc(true).endOf("month").endOf("day").toDate(),
        },
      }).count();
      const upcomingHoliday = await this.Holiday.findOne({
        holidayDate: { $gte: moment().startOf("day").toDate() },
      });

      const user = await this.User.findOne({ _id: payload._id });

      const totalDaysDifference = moment(moment().endOf("month").toDate()).diff(
        moment().startOf("month").toDate(),
        "days"
      );

      const absentDaysDiffrence = moment(moment().endOf("month").toDate()).diff(
        moment().toDate(),
        "days"
      );

      for (let i = 0; i < totalDaysDifference + 1; i++) {
        if (
          !weekends().includes(
            moment()
              .startOf("month")
              .add(i + 1, "day")
              .format("dddd")
          )
        ) {
          totalWorkingDays += 1;
        }
      }

      for (let i = 0; i < absentDaysDiffrence + 1; i++) {
        if (
          !weekends().includes(
            moment()
              .startOf("month")
              .add(i + 1, "day")
              .format("dddd")
          )
        ) {
          totalAbsentDays += 1;
        }
      }

      return {
        status: true,
        summary: {
          attendance,
          workDays: totalWorkingDays,
          presentDays: totalPresentDays,
          absentDays: totalAbsentDays,
          user,
          upcomingHoliday,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async punchTime(payload: ILoggedInUser) {
    try {
      const present = await this.Attendance.findOne({
        user: payload._id,
        workDate: {
          $gte: moment().utc(true).startOf("day").toDate(),
          $lte: moment().utc(true).endOf("day").toDate(),
        },
      });

      const lastEntry = await this.UserEntries.findOne({
        user: payload._id,
        workDate: {
          $gte: moment().utc(true).startOf("day").toDate(),
          $lte: moment().utc(true).endOf("day").toDate(),
        },
      }).sort({ updatedAt: -1 });

      if (present) {
        if (!lastEntry?.out) {
          const calculatedMinutes = moment(moment().toDate()).diff(
            present.startTime,
            "minutes"
          );
          const hours = calculatedMinutes / 60;
          const minutes = Math.round((hours - Math.floor(hours)) * 60);
          await lastEntry.updateOne(
            { out: moment().toDate() },
            { upsert: true, new: true }
          );

          await present.updateOne(
            { hours, minutes, endTime: moment().toDate() },
            { upsert: true, new: true }
          );
        } else {
          const user_entry = await this.UserEntries.create({
            user: payload._id,
            in: moment().toDate(),
            workDate: moment().startOf("day").utc(true).toDate(),
          });
          present.entries.push(user_entry._id);
          present.save();
        }
      } else {
        const attendance = new this.Attendance({
          user: payload._id,
          startTime: moment().toDate(),
          workDate: moment().startOf("day").utc(true).toDate(),
          totalHours: 0,
          entries: [],
        });
        if (!lastEntry) {
          const user_entry = await this.UserEntries.create({
            user: payload._id,
            workDate: moment().startOf("day").utc(true).toDate(),
            in: moment().toDate(),
          });
          attendance.entries.push(user_entry._id);
          await attendance.save();
        }
      }

      const updated = await this.Attendance.findOne({
        user: payload._id,
        workDate: {
          $gte: moment().utc(true).startOf("day").toDate(),
          $lte: moment().utc(true).endOf("day").toDate(),
        },
      }).populate({ path: "entries" });
      return {
        status: true,
        data: updated,
      };
    } catch (error) {
      throw error;
    }
  }
}
