const axios = require("axios").default;

export const getTemplateService = async () => {
  const options = {
    url: `${process.env.REACT_APP_API_URI}/bigfive/template`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

  const res = await axios(options);
  if (res.status !== 200) {
    return Promise.reject(res.statusText);
  }
  return res.data;
};

export const submitTemplateService = async (token, template) => {
  const options = {
    url: `${process.env.REACT_APP_API_URI}/bigfive`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    data: template,
  };

  const res = await axios(options);
  if (res.status !== 200) {
    return Promise.reject(res.statusText);
  }
  return res.data;
};

export const checkExists = async (token) => {
  const options = {
    url: `${process.env.REACT_APP_API_URI}/bigfive`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios(options);
  if (res.status !== 200) {
    return Promise.reject(res.statusText);
  }

  if (res.data) {
    return true;
  } else {
    return false;
  }
};
