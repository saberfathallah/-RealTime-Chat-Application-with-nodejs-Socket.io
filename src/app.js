import express from 'express';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import http from 'http';
import cors from 'cors';

import routes from './routes';
import Invitation from './db/models/invitation';
import { getToken } from './utils/verifyToken';
import { PENDING } from './constants/invitationsStatus';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
routes(app);

const io = socketio(server);

io.on('connect', async (socket) => {
  console.log('connectt');
  socket.on('sendInvitation', async (invitation) => {
     
    console.log('invitation', invitation);
    const userConnectedId = getToken(invitation.userToken)
    console.log("userConnectedId", userConnectedId)
    try {

      await Invitation.create({ idInvited: invitation.idInvited, status: PENDING, id: userConnectedId });
      // io.emit('reciveInvitation', { user: "invitation weslet" });
    } catch (error) {
      console.log("errorsendInvitation", error)
    }
  });
});

app.on('error', (err) => {
  console.log(`server error ${err}`);
});

export default server;
