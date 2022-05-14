import Gun from "gun";
import http from "http";
const server = http.createServer().listen(8080);

Gun({ web: server });
