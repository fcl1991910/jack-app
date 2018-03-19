import axios from "axios";

export var callApi = (method, action, params, access_token = "") => {
  console.log("Called "+action);
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

export var array_intersection = function(a, b) {
  // 交集
  var result = [];
  for (var i = 0; i < b.length; i++) {
    var temp = b[i];
    for (var j = 0; j < a.length; j++) {
      if (temp === a[j]) {
        result.push(temp);
        break;
      }
    }
  }
  return result;
};
