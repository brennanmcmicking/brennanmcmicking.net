import { Box, CircularProgress, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

import "./SpotifyWidget.css";
import ExternalImage from "../ExternalImage";

export interface SpotifyWidgetProps {}

interface ListeningTo {
  progress: number;
  duration: number;
  album_name: string;
  artists: string[];
  song_name: string;
  img_url: string;
}

type WidgetState =
  | "uninitialized"
  | "loading"
  | "nothing"
  | "success"
  | "error";

const SpotifyWidget = (props: SpotifyWidgetProps) => {
  const [data, setData] = useState<ListeningTo | undefined>(undefined);
  const [widgetState, setWidgetState] = useState<WidgetState>("uninitialized");

  const getBgColor = (): string => {
    if (widgetState === "error") {
      return "red";
    } else if (widgetState === "uninitialized") {
      return "blue";
    } else if (widgetState === "loading") {
      return "blue";
    } else if (widgetState === "nothing") {
      return "grey";
    } else if (widgetState === "success") {
      return "#191414";
    }

    return "red";
  };

  const refresh = () => {
    setWidgetState("loading");
    fetch("https://api.brennanmcmicking.net/v1/spotify/now-playing")
      .then((response) => {
        if (response.status === 204) {
          setWidgetState("nothing");
        } else if (response.status === 200) {
          setWidgetState("success");
          return response.json();
        } else {
          setWidgetState("error");
        }
      })
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    if (widgetState === "uninitialized") {
      refresh();
    }
  });

  return (
    <Box
      bgcolor={getBgColor()}
      className="now-listening-box"
      margin={"auto"}
      padding="10px"
      sx={{
        display: "flex",
        flexDirection: "row",
        // flexWrap: "nowrap",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {widgetState === "success" && data && (
        <>
          <Box>
            <ExternalImage
              src={data.img_url}
              alt={data.album_name}
              className="album-image"
            />
          </Box>
          <Box marginLeft={1} sx={{ overflow: "hidden" }} flexGrow={1}>
            <Typography
              className="now-listening-song"
              // align="left"
              // overflow={"hidden"}
              noWrap
              color={"#ffffff"}
            >
              {data.song_name.length > 30 ? (
                <Marquee pauseOnHover={true} speed={25} delay={2}>
                  <>
                    {data.song_name}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </>
                </Marquee>
              ) : (
                <>{data.song_name}</>
              )}
            </Typography>
            <Typography className="now-listening-artists" color={"#b3b3b3"}>
              by {data.artists.join(", ")}
            </Typography>
            <Typography className="now-listening-album" color={"#b3b3b3"}>
              on {data.album_name}
            </Typography>
          </Box>
          <Box
            marginLeft={1}
            marginRight={0}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <RefreshIcon
              htmlColor="white"
              cursor={"pointer"}
              onClick={refresh}
            />
          </Box>
        </>
      )}
      {widgetState === "nothing" && (
        <>
          <Typography flexGrow={1}>Not listening to anything</Typography>
          <Box
            marginLeft={1}
            marginRight={0}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <RefreshIcon
              htmlColor="white"
              cursor={"pointer"}
              onClick={refresh}
            />
          </Box>
        </>
      )}
      {widgetState === "error" && (
        <Typography>Internal server error</Typography>
      )}
      {widgetState === "loading" && (
        <CircularProgress style={{ color: "white" }} />
      )}
    </Box>
  );
};

export default SpotifyWidget;
