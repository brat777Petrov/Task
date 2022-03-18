function pick(obj, props) {
  console.log("pick");
  let res = {};
  for (let key in props) {
    res[props[key]] = obj[props[key]];
  }
  return res;
}

module.exports.pick = pick; 
