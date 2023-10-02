import { Box, Button, TextField, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import { ContentCopy } from "@mui/icons-material";

import "./ShortenerWidget.css";

type WidgetState = "enter" | "loading" | "done";

const ShortenerWidget = (props: any) => {
  const [phase, setPhase] = useState<WidgetState>("enter");
  const [input, setInput] = useState<string | undefined>("");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const submit = (text: string) => {
    setPhase("loading");
    setError(false);
    fetch(
      "https://brwv7txdse.execute-api.us-west-2.amazonaws.com/prod/shorten",
      {
        method: "POST",
        body: JSON.stringify({
          url: text,
        }),
      }
    )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          console.log("123");
          return response.json();
        } else {
          setError(true);
          setPhase("enter");
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
          data && setInput(data.url);
          setPhase("done");
          setError(false);
        }
      });
  };

  return (
    <Box
      id="shortener-widget-box"
      sx={{
        display: "flex",
        flexDirection: "row",
        // flexWrap: "nowrap",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "10px",
      }}
      border={1}
    >
      <>
        <TextField
          variant="outlined"
          error={error}
          disabled={phase === "loading"}
          onChange={(e) => {
            if (phase === "enter") {
              setInput(e.target.value);
            }
          }}
          onSubmit={(e) => input && submit(input)}
          value={input}
        />
        {(phase === "enter" || phase === "loading") && (
          <Button
            onClick={(e) => input && submit(input)}
            disabled={phase === "loading"}
          >
            Shorten
          </Button>
        )}
        {phase === "done" && (
          <>
            <Tooltip title="Copied!" arrow open={showTooltip}>
              <ContentCopy
                cursor="pointer"
                onClick={() => {
                  if (input) {
                    navigator.clipboard.writeText(input);
                    setShowTooltip(true);
                    new Promise((res) => setTimeout(res, 1000)).then(() =>
                      setShowTooltip(false)
                    );
                  }
                }}
              />
            </Tooltip>
            <RefreshIcon
              htmlColor="black"
              cursor="pointer"
              onClick={() => {
                setPhase("enter");
                setInput("");
              }}
            />
          </>
        )}
      </>
    </Box>
  );
};

export default ShortenerWidget;
