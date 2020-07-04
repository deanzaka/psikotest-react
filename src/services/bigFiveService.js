export const getTemplateService = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const res = await fetch(
    `${process.env.REACT_APP_LOCAL_API_URL}/bigfive/template`,
    requestOptions
  );
  const template = await handleResponse(res);

  localStorage.setItem("template", JSON.stringify(template));
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
