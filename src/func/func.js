import axios from "axios";

export var callApi = (method, action, params, access_token = "") => {
  let key = {
    method: method,
    url: "http://wangcai.com.au/" + action,
    headers: {
      'Authorization': "Bearer " + access_token
    }
  };
  key[method === "get" ? "params" : "data"] = params;
  return axios(key);
};
