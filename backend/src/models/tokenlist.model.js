const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const APIError = require("../utils/APIError");
const User = require("./user.model");

const tokenListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    symbol: {
      type: String,
      require: true,
    },
    decimal: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
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

tokenListSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "name",
      "symbol",
      "decimal",
      "address",
      "status",
      "user",
      "createdAt",
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    if (this.user instanceof User) {
      transformed["user"] = this.user.transform();
    }

    return transformed;
  },
});

tokenListSchema.statics = {
  async get(id) {
    try {
      let token;

      // Get user with userId from token
      if (mongoose.Types.ObjectId.isValid(id)) {
        token = await this.findById(id).populate("user");
      }
      if (token) {
        return token;
      }

      // Returns error if token list doesn't exist
      throw new APIError({
        message: "Token does not exist",
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
      // Get token list from database
      let tokenlist = await this.find(options)
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate("user")
        .exec();
      tokenlist = tokenlist.map((token) => token.transform());

      let total = await this.countDocuments(options).exec();

      return {
        tokenlist,
        // total,
        // page,
        // totalPages: Math.ceil(total / perPage),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

module.exports = mongoose.model("TokenList", tokenListSchema);
