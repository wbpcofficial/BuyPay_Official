import axios from "axios";
import moment from "moment-timezone";
import { getURLWithParams, saveAuth } from "../utils";
import {
  API_LOGIN_URL,
  API_REGISTER_URL,
  API_PROFILE_URL,
  API_REFRESH_TOKEN_URL,
  API_USERS_URL,
  API_TIMEZONES_URL,
  API_GET_CAPTCHA,
} from "../constants";

const authHeaderConfig = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const { accessToken } = auth.token;
  const headerConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return headerConfig;
};

const refreshToken = async () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const { expires, refreshToken } = auth.token;
  const { email } = auth.user;
  if (moment().add(20, "minutes") > moment(expires)) {
    try {
      const response = await axios.post(API_REFRESH_TOKEN_URL, {
        email,
        refreshToken,
      });
      auth.token = response.data;
      localStorage.setItem("auth", JSON.stringify(auth));
    } catch (e) {
      console.log(e);
    }
  }
};

const responseError = (error) => {
  if (error.response && error.response.status === 401) {
    console.log('logging out');
    logout();
  }
  const message = error.response ? error.response.data.message : error.message;
  return new Error(message);
};

export const logout = () => {
  console.log('removing from somewhere');
  localStorage.removeItem("auth");
};

export const register = async (data) => {
  try {
    const response = await axios.post(API_REGISTER_URL, data);
    saveAuth(response.data);
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(API_LOGIN_URL, data);
    saveAuth(response.data);
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await axios.patch(
      API_PROFILE_URL,
      data,
      authHeaderConfig()
    );
    // saveAuth(response.data);
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

/**
 * 
 * Api service to get Captcah 
 */
export const getCaptcha = async (data) => {
  try {
    const response = await axios.get(API_GET_CAPTCHA, data);
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
}


/**
 * Api services to manage Users
 */
export const fetchUsers = async (params = {}) => {
  try {
    const response = await axios.get(
      getURLWithParams(API_USERS_URL, params),
      authHeaderConfig()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const fetchUser = async (userId) => {
  try {
    const response = await axios.get(
      `${API_USERS_URL}/${userId}`,
      authHeaderConfig()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const createUser = async (data) => {
  try {
    const response = await axios.post(API_USERS_URL, data, authHeaderConfig());
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      logout();
    }
    throw responseError(e);
  }
};

export const updateUser = async (userId, data) => {
  try {
    const response = await axios.patch(
      `${API_USERS_URL}/${userId}`,
      data,
      authHeaderConfig()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `${API_USERS_URL}/${userId}`,
      authHeaderConfig()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

/**
 * Api services to manage Timezones
 */
export const fetchTimezones = async (params = {}) => {
  try {
    const response = await axios.get(
      getURLWithParams(API_TIMEZONES_URL, params),
      authHeaderConfig()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const fetchTimezone = async (timezoneId) => {
  try {
    const response = await axios.get(
      `${API_TIMEZONES_URL}/${timezoneId}`,
      authHeaderConfig()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const createTimezone = async (data) => {
  try {
    const response = await axios.post(
      API_TIMEZONES_URL,
      data,
      authHeaderConfig()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const updateTimezone = async (timezoneId, data) => {
  try {
    const response = await axios.patch(
      `${API_TIMEZONES_URL}/${timezoneId}`,
      data,
      authHeaderConfig()
    );
    return response.data;
  } catch (e) {
    throw responseError(e);
  }
};

export const deleteTimezone = async (timezoneId) => {
  try {
    const response = await axios.delete(
      `${API_TIMEZONES_URL}/${timezoneId}`,
      authHeaderConfig()
    );
    return response.data;
  } catch (e) {
    return responseError(e);
  }
};
