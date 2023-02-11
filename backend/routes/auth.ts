import { Router } from "express";
import superagent from "superagent";

const auth: Router = Router();

auth.get("/login", (req, res) => {
  const redirect_uri = process.env.CALLBACK_URI;
  const client_id = process.env.CLIENT_ID;
  const scopes = process.env.SCOPES;

  return res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}`
  );
});

auth.get("/callback", async (req, res) => {
  const code = req.query.code;
  const redirect_uri = process.env.CALLBACK_URI;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const { body: token } = await superagent
    .post("https://accounts.spotify.com/api/token")
    .send({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    })
    .set(
      "Authorization",
      `Basic ${new Buffer(client_id + ":" + client_secret).toString("base64")}`
    )
    .set("Content-Type", "application/x-www-form-urlencoded")
    .set("Data-Type", "application/json");

  req.session.token = {
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
  };

  console.log(req.session.token);

  return res.json({ message: "got token" });
});

export default auth;
