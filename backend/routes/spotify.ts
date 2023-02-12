import { Router } from "express";
import superagent from "superagent";
import { SPOTIFY_API_URL } from "../utils/config/spotify.config";

const spotify: Router = Router();

spotify.get("/player", async (req, res) => {
  try {
    const { body: item } = await superagent
      .get(`${SPOTIFY_API_URL}/me/player`)
      .set("Authorization", `Bearer ${req.session.token?.accessToken}`)
      .set("Content-Type", "application/json")
      .set("Data-Type", "application/json");

    res.json(item);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export default spotify;
