const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const APIError = require("../utils/APIError");
const User = require("./user.model");

const timezoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    timeDiff: {
      type: Number,
      require: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);


timezoneSchema.method({
  transform() {
    const transformed = {};
    const fields = ["id", "name", "city", "timeDiff", "user", "createdAt"];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    if (this.user instanceof User) {
      transformed["user"] = this.user.transform();
    }

    return transformed;
  },
});


timezoneSchema.statics = {
  async get(id) {
    try {
      let timezone;

      // Get user with userId from timezone
      if (mongoose.Types.ObjectId.isValid(id)) {
        timezone = await this.findById(id).populate("user");
      }
      if (timezone) {
        return timezone;
      }

      // Returns error if timezone doesn't exist
      throw new APIError({
        message: "Timezone does not exist",
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  async list({ page = 1, perPage = 10, keyword, userId }) {
    const options = {};

    page = parseInt(page);
    perPage = parseInt(perPage);
    
    // if keyword exists, find by name, email and role using keyword
    if (keyword && keyword.length > 0) {
      options["$or"] = [
        {
          name: RegExp(keyword, "i"),
        },
        {
          city: RegExp(keyword, "i"),
        },
      ];
    }
    if (userId) {
      options["user"] = userId;
    }
    console.log(options);
    
    try {
      // Get timezones from database
      let timezones = await this.find(options)
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate("user")
        .exec();
      timezones = timezones.map((timezone) => timezone.transform());

      let total = await this.countDocuments(options).exec();

      return {
        timezones,
        total,
        page,
        totalPages: Math.ceil(total / perPage),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

module.exports = mongoose.model("Timezone", timezoneSchema);
