const axios = require("axios").default;

export const submitStoryService = async (accessToken, content) => {
  try {
    const options = {
      url: `${process.env.REACT_APP_API_URI}/story`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        doc: content,
      },
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
      url: `${process.env.REACT_APP_API_URI}/story`,
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
