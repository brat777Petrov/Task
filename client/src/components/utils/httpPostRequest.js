// type,url, params, callback
function httpPostRequest(url, body) {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest();
    x.open("POST", url);
    x.setRequestHeader("Content-type", "application/json; charset=utf-8");
   
    console.log('httpPostRequest body ',body);
    x.send(body);
    x.onload = () => {
      resolve(x.response);
    };
    x.onerror = () => {
      reject(console.log("error"));
    };
  });
}
export default httpPostRequest;
