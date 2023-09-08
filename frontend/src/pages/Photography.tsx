import Photograph from "../components/Photograph";
import Fog from "../pictures/fog.jpg";

export interface PhotographyProps {

}

const Photography = (props: PhotographyProps) => {

  return <><Photograph src={Fog} alt="A foggy day in the Clayquot sound"></Photograph></>;
}

export default Photography;