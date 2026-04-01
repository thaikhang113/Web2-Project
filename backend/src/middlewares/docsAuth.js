const basicAuth = require("basic-auth");

const { env } = require("../config/env");

function docsAuth(req, res, next) {
  const credentials = basicAuth(req);

  if (
    credentials &&
    credentials.name === env.docsUsername &&
    credentials.pass === env.docsPassword
  ) {
    return next();
  }

  res.set("WWW-Authenticate", 'Basic realm="api-docs"');
  return res.status(401).send("Authentication required for api-docs");
}

module.exports = { docsAuth };
