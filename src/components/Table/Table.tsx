import s from "./Table.module.scss";
import { useAppSelector } from "../../hooks";
const names = ["ticker", "shortname", "weight", "prevprice"];
export const Table = () => {
  const { loading, imoex, securities } = useAppSelector((state) => state.data);
  const table = imoex.map((company) => {
    const { ticker, shortnames, weight } = company;
    const price = securities[ticker].prevprice;
    return { ticker, shortnames, weight, price };
  });
  
  if (loading === "pending") {
    return <div>...Loading</div>;
  }

  return <></>;
};
