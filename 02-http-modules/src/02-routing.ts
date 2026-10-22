import http, { type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 3001;


const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";

    const requestUrl = new URL(req.url ?? "/", `http:${req.headers.host}`);
    const pathName = requestUrl.pathname;

    res.setHeader("Content-Type", "text/plain");

    if (method === "GET" && pathName === "/health") {
        res.statusCode = 200;
        res.end("server is healthy");
        return;
    }

    if (method === "GET" && pathName === "/users") {
      res.statusCode = 200;
      res.end("list of users");
      return;
    }

    if (method === "POST" && pathName === "/users") {
      res.statusCode = 201;
      res.end("user created successfully!");
      return;
    }

    res.statusCode = 404 // route not found
    res.end("route not found")
})

server.listen(PORT, () => {
  console.log(`server is now running on PORT:${PORT}`);
});