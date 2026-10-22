import http, {type IncomingMessage, type ServerResponse} from 'node:http';

const PORT = 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
     
    const method = req.method; // get, post, put, patch, delete
    const url = req.url; // in which path the client is actually requesting

    const userAgent = req.headers["user-agent"]; //metadata

    res.statusCode = 200; // set http status code like 200, 400, 404, 429 etc.

    res.setHeader('Content-Type', 'text/plain');

    res.end(`Basic http node server: ${method}: ${url}: ${userAgent}`);

})

server.listen(PORT, ()=> {
    console.log(`server is now running on PORT:${PORT}`)
})