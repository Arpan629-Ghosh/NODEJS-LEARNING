import http, { type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 3003;

type User = {
  id: number;
  name: string;
  email: string;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

const users: User[] = [
  { id: 1, name: "Arpan", email: "arpan@gmail.com" },
  { id: 2, name: "Sambhav", email: "sambhav@gmail.com" },
];

function sendJson<T>(
  res: ServerResponse,
  statusCode: number,
  body: ApiResponse<T>,
): void {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";

    const requestUrl = new URL(req.url ?? "/", `http:${req.headers.host}`);
    const pathName = requestUrl.pathname;

    if (method === "GET" && pathName === "/") {
      sendJson(res, 200, {
        success: true,
        message: "server is running",
        data: ["GET/users"],
      });
        return;
    }

    if (method === "GET" && pathName === "/users") {
      sendJson(res, 200, {
        success: true,
        message: "users fetched successfully!",
        data: users,
      });
        return;
    }

    sendJson<null>(res, 404, {
      success: false,
      message: "Route not found",
      error: `${method} ${pathName} is not exists`,
    });
  },
);

server.listen(PORT, () => {
  console.log(`server is now running on PORT:${PORT}`);
});