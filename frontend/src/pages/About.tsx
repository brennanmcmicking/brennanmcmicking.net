import { Box, List, ListItemText, Typography } from "@mui/material";
import Headshot from "../pictures/headshot.jpg";

export interface AboutProps {}

const About = (props: AboutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "auto",
        width: "50%",
      }}
    >
      <Box width="70%" paddingRight={1} marginBottom={10}>
        <Typography fontSize={24}>Hi, I'm Brennan</Typography>
        <Typography>
          I'm all of the following things:
          <Box paddingLeft={1}>
            <List>
              <ListItemText>
                1. Software Engineering Student at UVic (B.SEng)
              </ListItemText>
              <ListItemText>
                2. Junior Software Developer at AbeBooks, an Amazon Company
              </ListItemText>
              <ListItemText>
                3. Former Administrator of the UVic Minecraft Club
              </ListItemText>
              <ListItemText>
                4. Former volunteer with the UVic Engineering Student Society
              </ListItemText>
            </List>
          </Box>
          I love to make things! Music, food, friends... the list goes on. I
          take particular interest in developing software systems which can make
          our lives easier. At AbeBooks/Amazon I get to satisfy this passion by
          leveraging my customer obsession to develop systems which make the
          lives of our users easier. If you are interested in talking about how
          software can enhance the world around us, feel free to shoot me a
          message <a href="https://linkedin.com/in/bmcmicki">on LinkedIn</a>.
        </Typography>
        <Typography>
          You might feel like this website is a little sparse. It's still a
          work-in-progress; more of my work will show up under the other two
          tabs as time goes on. To see what I'm up to in my free time, check out{" "}
          <a href="https://github.com/brennanmcmicking">my GitHub profile</a>.
        </Typography>
      </Box>
      <Box width="30%">
        <img src={Headshot} alt="A photograph of Brennan" width="100%" />
      </Box>
    </Box>
  );
};

export default About;
