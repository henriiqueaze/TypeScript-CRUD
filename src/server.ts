import express from 'express';
import { indexRouter } from './routers/indexRouter';

const server = express();
server.use(express.json());

indexRouter(server);

server.listen(3000, () => console.log("Server running on port 3000"));