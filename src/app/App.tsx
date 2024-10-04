import s from "./App.module.scss";
import { Table } from "../components/Table/Table";
import { UserMoneyInput } from "../components/UserMoneyInput/UserMoneyInput";
import { AddCompany } from "../components/AddCompany/AddCompany.jsx";

function App() {
  return (
    <div className={s.App}>
      <UserMoneyInput />
      <Table />
      <AddCompany />
    </div>
  );
}

export default App;
