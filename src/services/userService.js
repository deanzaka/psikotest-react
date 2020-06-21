export const loginService = async (_id, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id, password }),
  };

  const res = await fetch(
    `http://localhost:3000/api/v1/auth/login`,
    requestOptions
  );
  const user = await handleResponse(res);

  localStorage.setItem("user", JSON.stringify(user));
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
