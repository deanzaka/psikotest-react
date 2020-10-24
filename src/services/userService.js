const axios = require("axios").default;

export const updateProfileService = async (userData) => {
  try {
    const token = userData.token;
    delete userData.token;
    const options = {
      url: `${process.env.REACT_APP_API_URI}/users`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      data: userData,
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

export const loginService = async (_id, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id, password }),
  };

  const res = await fetch(
    `${process.env.REACT_APP_API_URI}/auth/login`,
    requestOptions
  );
  const user = await handleResponse(res);
  return user;
};

export const logoutService = () => {
  localStorage.removeItem("user");
};

const handleResponse = async (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status !== 200) {
        logoutService();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};
