import React from "react";
import ReactPlayer from "react-player";
import { withStyles } from "@material-ui/core/styles";

const styles: any = {
  wrapper: {
    position: "relative",
    paddingTop:
      "56.25%" /* 720 / 1280 = 0.5625 i.e. Player ratio: 100 / (1280 / 720) */,
    backgroundColor: "#444"
  },
  player: {
    position: "absolute",
    top: 0,
    left: 0
  }
};

const MediaPlayer = ({
  record = {},
  source,
  classes
}: {
  [key: string]: any;
}) => (
  <div className={classes.wrapper}>
    <ReactPlayer
      className={classes.player}
      url={record[source]}
      controls={true}
      width="100%"
      height="100%"
    />
  </div>
);

export default withStyles(styles)(MediaPlayer);
