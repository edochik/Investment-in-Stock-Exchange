import { useSelector } from "react-redux";
import s from "./Table.module.scss";
import { RootState } from "../../redux/store.js";

const Table = () => {
  const { loading: loadingImoex, data: imoex } = useSelector(
    (state: RootState) => state.imoex
  );
  const { loading: loadingSecurities, data: securities } = useSelector(
    (state: RootState) => state.securities
  );
  console.log(imoex);
  console.log(securities);
  const imoexTest = {
    indexid: "IMOEX",
    secids: "AFLT", //values AFLT
    shortnames: "Аэрофлот", // values Аэрофлот
    ticker: "AFLT", //values AFLT
    tradedate: "2024-09-17",
    tradingsession: 3,
    weight: 0.78,
  };
  // console.log(securities);
  //ключей нет во второй таблице
  // проходимся по imoexTest по значениям secids, и вытаскиваем из объекта значения
  // {
  //   'AFLT' :{

  //   }
  // }
  const securiteisTest = {};
  return (
    <>
      {loadingImoex === "pending" ? (
        <div>...Loading</div>
      ) : (
        <div>Загрузилось</div>
      )}
      {loadingSecurities === "pending" ? (
        <div>...Loading</div>
      ) : (
        <div>Загрузилось</div>
      )}
    </>
  );
};

export { Table };
