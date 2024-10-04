import s from "./App.module.scss";
import { Table } from "../components/Table/Table";
import { UserMoneyInput } from "../components/UserMoneyInput/UserMoneyInput";
import { SelectedCompany } from "../components/SelectedCompany/SelectedCompany";

function App() {
  return (
    <div className={s.App}>
      <UserMoneyInput />
      <Table />
      <SelectedCompany />
    </div>
  );
}

export default App;
