const fs = require("fs");
const https = require("https");
const path = require("path");
const selfsigned = require("selfsigned");

const app = require("./src/app");
const { env } = require("./src/config/env");
const { checkDatabaseConnection } = require("./src/config/db");

async function bootstrap() {
  if (!env.databaseUrl) {
    throw new Error("DATABASE_URL is required to run the backend");
  }

  await checkDatabaseConnection();

  const httpsOptions = (() => {
    const pfxPath = env.httpsPfxPath
      ? path.resolve(__dirname, env.httpsPfxPath)
      : null;

    if (pfxPath && fs.existsSync(pfxPath)) {
      return {
        pfx: fs.readFileSync(pfxPath),
        passphrase: env.httpsPfxPassphrase || undefined,
      };
    }

    const pems = selfsigned.generate(
      [{ name: "commonName", value: "localhost" }],
      {
        algorithm: "sha256",
        days: 365,
        keySize: 2048,
        extensions: [
          {
            name: "basicConstraints",
            cA: false,
          },
          {
            name: "keyUsage",
            digitalSignature: true,
            keyEncipherment: true,
          },
          {
            name: "extKeyUsage",
            serverAuth: true,
          },
          {
            name: "subjectAltName",
            altNames: [
              { type: 2, value: "localhost" },
              { type: 7, ip: "127.0.0.1" },
            ],
          },
        ],
      },
    );

    return {
      key: pems.private,
      cert: pems.cert,
    };
  })();

  https
    .createServer(httpsOptions, app)
    .listen(env.port, () => {
      console.log(`Backend listening on https://localhost:${env.port}`);
      console.log(`API docs: https://localhost:${env.port}/api-docs`);
    });
}

bootstrap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
