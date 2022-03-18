module.exports = function (req, res, next) {
  if (req === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log( 'middleware token',token)
  } catch (e) {
    console.log(e);
  }

}