import httpGetRequest from "./httpGetRequest"

function loadData(url, params) {
  // console.log("loadData ", url, params);
  return new Promise((resolve, reject) => {
    httpGetRequest("GET",url, params, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

export default loadData;