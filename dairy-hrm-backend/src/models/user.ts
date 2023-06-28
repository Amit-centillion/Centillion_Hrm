import { model, PaginateModel, Schema } from "mongoose";
import { IUser } from "../interfaces/IUsers";
import paginate from "mongoose-paginate-v2";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    mobileNo: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    dob: {
      type: Date,
    },
    code: {
      type: String,
    },
    joiningDate: {
      type: Date,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "departments",
    },
    designation: {
      type: Schema.Types.ObjectId,
      ref: "designations",
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    gender: {
      type: String,
    },
    profile: {
      type: String,
    },
    address: {
      street1: {
        type: String,
      },
      street2: {
        type: String,
      },
      area: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      locality: {
        type: String,
      },
      country: {
        type: String,
      },
      pincode: {
        type: Number,
      },
    },
    documents: [
      {
        name: {
          type: String,
        },
        document: {
          type: Schema.Types.ObjectId,
          ref: "Documents",
        },
      },
    ],
    qualifications: [
      {
        name: {
          type: String,
        },
        percentage: {
          type: String,
        },
        passingYear: {
          type: String,
        },
      },
    ],
    bankInfo: {
      name: {
        type: String,
      },
      branchName: {
        type: String,
      },
      accountNo: {
        type: String,
      },
      ifscCode: {
        type: String,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
    },
    taxInfo: [
      {
        name: {
          type: String,
        },
        number: {
          type: String,
        },
      },
    ],
    salaryInfo: {
      basic: {
        type: Number,
      },
      allowances: {
        type: Number,
      },
    },
    leaveInfo: {
      totalLeaves: {
        type: Number,
        default: 18,
      },
      takenLeaves: {
        type: Number,
        default: 0,
      },
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "roles",
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

UserSchema.plugin(paginate);

export default model<IUser, PaginateModel<IUser>>("users", UserSchema);
