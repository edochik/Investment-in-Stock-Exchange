import s from "./App.module.scss";
import { Table } from "../components/Table/Table";
import { UserMoneyInput } from "../components/UserMoneyInput/UserMoneyInput";
import { CompanySelector } from "../components/CompanySelector/CompanySelector";
import { Cart } from "../components/Cart/Cart";

function App() {
  return (
    <div className={s.App}>
      <div className={s.wrapper}>
        <UserMoneyInput />
        <Cart />
      </div>
      <Table />
      <CompanySelector />
    </div>
  );
}

export default App;
