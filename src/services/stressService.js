const axios = require("axios").default;

export const getTemplateService = async () => {
  const options = {
    url: `${process.env.REACT_APP_API_URI}/stress/template`,
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

export const submitTemplateService = async (accessToken, template) => {
  try {
    const options = {
      url: `${process.env.REACT_APP_API_URI}/stress`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
      data: template,
    };

    const res = await axios(options);
    if (res.status !== 200) {
      return Promise.reject(res.statusText);
    }
    return res.data;
  } catch (err) {
    if (err.response.status === 401) {
      localStorage.removeItem("user");
    } else {
      return Promise.reject(err.response);
    }
  }
};

export const checkExists = async (accessToken) => {
  try {
    const options = {
      url: `${process.env.REACT_APP_API_URI}/stress`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await axios(options);
    if (res.status !== 200) {
      return Promise.reject(res.statusText);
    }

    if (res.data.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    if (err.response.status === 401) {
      localStorage.removeItem("user");
    } else {
      return Promise.reject(err.response);
    }
  }
};
