import BasicInfoCard from "../../components/BasicInfoCard/BasicInfoCard";
// import { Navbar } from "../../components/Navbar/Navbar";
// import DetailedCard from "../../components/DetailedCard/DetailedCard";
import image from "/src/assets/Graduation.jpeg";

export default function Homepage() {
  return (
    <>
      {/* <Navbar /> */}
      <h1>This is the Homepage!</h1>
      <BasicInfoCard song={"Flashing Lights"} artist={"Kanye West"} album={"Graduation"} img={image} />
    </>
  );
}
