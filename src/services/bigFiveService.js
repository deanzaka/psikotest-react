const axios = require("axios").default;

export const getTemplateService = async () => {
  const options = {
    url: `${process.env.REACT_APP_LOCAL_API_URL}/bigfive/template`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

  const res = await axios(options);
  console.log(res);
  const template = await handleResponse(res);
  return template;
};

const handleResponse = async (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status !== 200) {
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};
