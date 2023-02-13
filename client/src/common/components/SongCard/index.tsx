import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { Color } from "../../types";

export interface SongCardProps {
  title: string;
  color?: Color;
  imageSrc: string;
}

function SongCard({ title, color, imageSrc }: SongCardProps) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader title={title} />
      <CardMedia
        className="song-image"
        component="img"
        image={imageSrc}
        alt="song image"
      />

      <CardActions>
        <Button size="small">View</Button>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
}

export default SongCard;
