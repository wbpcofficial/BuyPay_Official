const mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const APIError = require('../utils/APIError');
const { jwtSecret, jwtExpirationInterval } = require('../config/vars');

const roles = ['admin', 'manager', 'regular'];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
 
  role: {
    type: String,
    enum: roles,
    default: 'regular',
  },
}, {
  timestamps: true,
});


userSchema.pre('save', async function save(next) {
  try {
    
    // We don't encrypt password if password fields is not modified.
    if (!this.isModified('password')) return next();

    const hash = await bcrypt.hash(this.password, 1);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({

  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email', 'role', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  token() {
    const playload = {
      exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.encode(playload, jwtSecret);
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
});


userSchema.statics = {

  roles,
  async get(id) {
    try {
      let user;

      // Find user by user id
      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      // Throws API error if user does not exist
      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  async findAndGenerateToken(options) {
    const { email, password, refreshObject } = options;
    if (!email) throw new APIError({ message: 'An email is required.' });

    // Find user by email
    const user = await this.findOne({ email }).exec();
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
    };

    // If password field exists check if password matches and generate token 
    if (password) {
      if (user && await user.passwordMatches(password)) {
        return { user, accessToken: user.token() };
      }
      err.message = 'Incorrect email or password';
    } else if (refreshObject && refreshObject.userEmail === email) {
      // if refresh token exists, generate token from refresh token
      if (moment(refreshObject.expires).isBefore()) {
        err.message = 'Invalid refresh token.';
      } else {
        return { user, accessToken: user.token() };
      }
    } else {
      err.message = 'Incorrect email or refreshToken';
    }
    throw new APIError(err);
  },

  async list({
    page = 1, perPage = 10, keyword,
  }) {
    const options = {};

    page = parseInt(page);
    perPage = parseInt(perPage);
    
    // if keyword exists, find by name, email and role using keyword
    if (keyword && keyword.length > 0) {
      options["$or"] = [
        {
          "name": RegExp(keyword, "i") 
        },
        {
          "email": RegExp(keyword, "i") 
        },
        {
          "role": RegExp(keyword, "i") 
        }
      ]
    }

    try {
      // Get users from database
      let users = await this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
      users = users.map(user => user.transform());

      let total = await this.countDocuments(options).exec();

      return ({
        users,
        total,
        page,
        totalPages: Math.ceil(total / perPage)
      });

    } catch (error) {
      throw error;
    }
  },

  checkDuplicateEmail(error) {
    // If there is error, check if error is due to email duplicate of mongodb
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Email already exists.',
        status: httpStatus.CONFLICT,
        isPublic: true,
      });
    }
    return error;
  },
};

module.exports = mongoose.model('User', userSchema);
