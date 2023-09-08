import styles from "./Photograph.module.css";

export interface PhotographProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const Photograph = (props: PhotographProps) => {
  return (
    <div className="photograph">
      <img src={props.src} className={styles.photograph} alt={props.alt} />
    </div>
  );
};

export default Photograph;
