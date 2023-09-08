import { useState } from "react";
import { CircularProgress } from "@mui/material";

export interface ExternalImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const ExternalImage = (props: ExternalImageProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  return (
    <div className="external-image">
      {!imageLoaded && <CircularProgress />}
      <img
        style={{
          visibility: imageLoaded ? "visible" : "hidden",
        }}
        src={props.src}
        alt={props.alt}
        className={props.className}
        onLoad={() => {
          console.log("image loaded");
          setImageLoaded(true);
        }}
      />
    </div>
  );
};

export default ExternalImage;
