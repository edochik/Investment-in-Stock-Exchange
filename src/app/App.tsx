import s from "./App.module.scss";
import { Table } from "../components/Table/Table";
import { UserMoneyInput } from "../components/UserMoneyInput/UserMoneyInput";

function App() {
  return (
    <div className={s.App}>
      <UserMoneyInput />
      <Table />
    </div>
  );
}

export default App;
