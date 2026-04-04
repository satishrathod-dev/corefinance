import config from "./config";

export const Registration = async (params) => {
  const url = `${config.API_PATH}${config.apis.Registration}`;
  console.log("params", params);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    console.log("response", response);
    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 422) {
      }
      return { error: errorData, response };
    }
    const data = await response.json();
    // ("API Response:", data);
    console.log("response from registration", data);

    return { response, data };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Unexpected Error",
      response: null,
    };
  }
};

export const Login = async (params) => {
  const url = `${config.API_PATH}${config.apis.Login}`;
  console.log("url", url)
  console.log("params", params);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    console.log("response", response);
    
    const data = await response.json();

    if(!response.ok) {
      throw new Error(data.message || "Login failed")
    }
    // ("API Response:", data);
    console.log("response from login", data);

    // return { response, data };
    return data;

  } catch (error) {
    return {
      success: false,
      error: error.message || "Unexpected Error",
      response: null,
    };
  }
};
