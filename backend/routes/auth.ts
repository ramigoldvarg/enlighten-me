import { Router } from "express";
import superagent from "superagent";
import { SPOTIFY_AUTH_ENDPOINT } from "../utils/config/spotify.config";

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

  try {
    const { body: token } = await superagent
      .post(SPOTIFY_AUTH_ENDPOINT)
      .send({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      })
      .set(
        "Authorization",
        `Basic ${new Buffer(client_id + ":" + client_secret).toString(
          "base64"
        )}`
      )
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Data-Type", "application/json");

    req.session.token = {
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
    };

    // TODO: redirect here to the home page
    return res.json({ message: "got token" });
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't get the token");
  }
});

auth.get("/refreshToken", async (req, res) => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  if (!req.session.token) {
    throw new Error("No token present");
  }

  try {
    const { body: token } = await superagent
      .post(SPOTIFY_AUTH_ENDPOINT)
      .send({
        refresh_token: req.session.token.refreshToken,
        grant_type: "refresh_token",
      })
      .set(
        "Authorization",
        `Basic ${new Buffer(client_id + ":" + client_secret).toString(
          "base64"
        )}`
      )
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Data-Type", "application/json");

    req.session.token = {
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
    };

    console.log(req.session.token);

    // TODO: redirect here to the original request
    return res.json({ message: "got token" });
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't get the token");
  }
});

export default auth;
