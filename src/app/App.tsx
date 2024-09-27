import s from "./App.module.scss";
import { Table } from "../components/Table/Table";
function App() {
  return (
    <div className={s.App}>
      <Table />
    </div>
  );
}

export default App;
