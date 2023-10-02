import { Box, Typography } from "@mui/material";
import SpotifyWidget from "../components/spotify/SpotifyWidget";
import ShortenerWidget from "../components/shortener/ShortenerWidget";

export interface ProjectsProps {}

const Projects = (props: ProjectsProps) => {
  return (
    <Box
      margin={"auto"}
      padding="10px"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box paddingX={10}>
        <>
          <SpotifyWidget />
          <Typography>
            This handly little React component integrates with a REST API to
            tell you what I'm listening to in real-time! The API runs on AWS
            Lambda/API Gateway and is written in Python. It authenticates itself
            using my Spotify API key and then asks the Spotify API what I'm
            listening to, formatting the output and returning it back to the
            caller. This allows anyone to see what I'm listening to on Spotify
            without gaining access to my Spotify Auth tokens/API key. It's
            deployed using GitHub actions and all of the AWS resources are
            defined using the AWS CDK.
          </Typography>
          <Typography>
            Full source is{" "}
            <a href="https://github.com/brennanmcmicking/spotify-service">
              on GitHub
            </a>
            .
          </Typography>
        </>
        <Box paddingTop={5}>
          <ShortenerWidget />
          <Typography>
            This URL shortener uses AWS Lambda, API Gateway, and DynamoDB. Enter
            a valid URL starting with "http" or "https" and click the button!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Projects;
