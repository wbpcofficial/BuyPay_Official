import moment from "moment-timezone";
export const emailValid = (email) => {
  var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  if (email.match(mailformat)) {
    return true;
  }
  return false;
};

export const getRequestQuery = (params = {}) => {
  Object.keys(params).forEach((key) => (params[key] == null) && delete params[key]);
  const query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  return query;
};

export const getURLWithParams = (url, params) => {
  return url + "?" + getRequestQuery(params);
};

export const saveAuth = (data) => {
  localStorage.setItem("auth", JSON.stringify(data));
};

export const getAuth = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth) {
    const { expires, refreshToken } = auth.token;
    if (moment() > moment(expires)) {
      localStorage.removeItem("auth");
      return false;
    }
  } else {
    return false;
  }
  return auth;
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}