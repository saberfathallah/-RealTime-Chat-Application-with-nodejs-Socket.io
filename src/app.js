import express from 'express';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import http from 'http';
import cors from 'cors';

import routes from './routes';
import Invitation from './db/models/invitation';
import { getUserToken } from './utils/verifyToken';
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
  const idInvited = socket.handshake.query.idInvited;
  socket.join(idInvited);
  socket.on('sendInvitation', async (invitation) => {
    const { idInvited, userToken } = invitation;
    const { id, firstName, lastName, email } = getUserToken(userToken);
    try {
      // await Invitation.remove({
      //   idInvited: id,
      // });
      await Invitation.create({
        idInvited: invitation.idInvited,
        status: PENDING,
        userSendInvitation: id,
      });
      io.to(idInvited).emit('reciveInvitation', {
        userSendInvitation: { firstName, lastName, email, id },
        status: PENDING,
        idInvited: invitation.idInvited,
      });
    } catch (error) {
      console.log('errorsendInvitation', error);
    }
  });
});

app.on('error', (err) => {
  console.log(`server error ${err}`);
});

export default server;
