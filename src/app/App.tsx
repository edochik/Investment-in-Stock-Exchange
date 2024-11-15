import s from "./App.module.scss";
import { Table } from "../components/Table/Table";
import { UserMoneyInput } from "../components/UserMoneyInput/UserMoneyInput";
import { CompanySelector } from "../components/CompanySelector/CompanySelector";
import { Cart } from "../components/Cart/Cart";
import { useAppSelector } from "../hooks";

function App() {
  const data = useAppSelector((state) => state.data.data);
  const { loading } = useAppSelector((state) => state.data);
  if (data === null) {
    return <p>Данные отсутствуют, нет подключения к интернету (сети)</p>;
  }
  const { updatedAt, isFresh } = data;
  const date = new Date(updatedAt!);
  const formatDate = date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  return (
    <div className={s.App}>
      <div className={s.wrapper}>
        <UserMoneyInput />
        {loading === "pending" && <p className={s.loading}>...загрузка</p>}
        {!isFresh && (
          <p className={s.info}>Информация загружена за {formatDate}</p>
        )}
        <Cart />
      </div>
      <Table />
      <CompanySelector />
    </div>
  );
}

export default App