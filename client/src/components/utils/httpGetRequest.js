
function httpGetRequest(type,url, params, callback,refreshToken) {
  console.log('httpGetRequest ', url );
  const fullUrl = url + params;
  const x = new XMLHttpRequest();
  
  x.open(type, fullUrl);
  x.setRequestHeader("Authorization", refreshToken);
  x.send();
 
  x.onload = () => {
    callback(null, JSON.parse(x.response));
  };
  x.onerror = () => { 
    callback("error");
  };
}

export default httpGetRequest;
