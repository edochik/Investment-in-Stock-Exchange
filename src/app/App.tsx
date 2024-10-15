import s from "./App.module.scss";
import { Table } from "../components/Table/Table";
import { UserMoneyInput } from "../components/UserMoneyInput/UserMoneyInput";
import { CompanySelector } from "../components/CompanySelector/CompanySelector";
import { Cart } from "../components/Cart/Cart";
import { Autocomplete } from "../components/Autocomplete/Autocomplete";
import { useState } from "react";

const colors = ["red", "blue", "green"];

function App() {
  const [color, setColor] = useState("");

  return (
    <div className={s.App}>
      <div className={s.wrapper}>
        <UserMoneyInput />
        <Cart />
      </div>
      <Table />
      <CompanySelector />
      <div style={{ marginBottom: 150 }}>
        <Autocomplete
          list={colors}
          filterByKey={(element, query) =>
            element.toLowerCase().includes(query.toLowerCase())
          }
          showElements={(element) => element}
          value={color}
          // setValue={setColor}
        />
      </div>
    </div>
  );
}

export default App;
