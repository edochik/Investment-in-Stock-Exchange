import s from "./App.module.scss";
import { Table } from "../components/Table/Table";
import { UserMoneyInput } from "../components/UserMoneyInput/UserMoneyInput";
import { SelectedCompany } from "../components/SelectedCompany/SelectedCompany";
import { useAppSelector } from "../hooks";

function App() {
  const cart = useAppSelector((state) => state.cart);
  return (
    <div className={s.App}>
      {cart.length}
      <UserMoneyInput />
      <Table />
      <SelectedCompany />
    </div>
  );
}

export default App;
