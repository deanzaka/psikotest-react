const axios = require("axios").default;

export const getTemplateService = async () => {
  const options = {
    url: `${process.env.REACT_APP_LOCAL_API_URL}/rmib/template`,
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
