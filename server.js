require("dotenv").config();
const app = require("./app/app");
const http = require("http");
const PORT = process.env.PORT || 3333;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server is listening http://localhost:${PORT}`);
});
