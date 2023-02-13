import { Grid } from "@mui/material";
import React from "react";
import SongCard from "../../common/components/SongCard";

function Home() {
  return (
    <Grid container className="songs">
      <Grid xs={4} item>
        <SongCard
          title="rami"
          imageSrc="https://i.scdn.co/image/ab67616d0000b273d9bcf5565005950b353bc9cf"
        />
      </Grid>
    </Grid>
  );
}

export default Home;
