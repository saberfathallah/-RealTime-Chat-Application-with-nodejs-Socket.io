import express from 'express';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import http from 'http';
import cors from 'cors';

import routes from './routes';
import Invitation from './db/models/invitation';
import { getUserToken } from './utils/verifyToken';
import { PENDING } from './constants/invitationsStatus';
import { sendInvitation } from './socketServices';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
routes(app);

const io = socketio(server);

io.on('connect', async (socket) => {
  const idInvited = socket.handshake.query.idInvited;
  socket.join(idInvited);
  socket.on('sendInvitation', (invitation) => sendInvitation(invitation, socket));
  });

app.on('error', (err) => {
  console.log(`server error ${err}`);
});

export default server;
