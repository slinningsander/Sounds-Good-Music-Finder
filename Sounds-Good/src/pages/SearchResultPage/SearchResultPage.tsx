import "./SearchResultPage.module.css";
import BasicInfoCard from "../../components/BasicInfoCard/BasicInfoCard.tsx";
import graduation from "../../assets/Graduation.jpeg";
import Page from "../../components/Page/Page.tsx";

export default function SearchResultPage() {
  const CARD_AMOUNT = 10;
  const resultDisplay = Array(CARD_AMOUNT)
    .fill(null)
    .map((_, index) => (
      <BasicInfoCard
        key={index}
        album={"Donda"}
        artist={"Kanye East"}
        img={graduation}
        song={"Junjoe"}
      />
    ));
  return <Page>{resultDisplay}</Page>;
}
