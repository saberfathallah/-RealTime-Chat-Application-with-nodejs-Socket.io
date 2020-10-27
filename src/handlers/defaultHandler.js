import services from '../services/userServices';

export default async ({ req = {}, res = {}, root }) => {
  try {
    const result = await services[root](req, res);
    return res.status(result.status).send(result);
  } catch (err) {
    console.log("err ---------------------------\n", err);
    return res.status(500).send({
      error: err.message,
    });
  }
};