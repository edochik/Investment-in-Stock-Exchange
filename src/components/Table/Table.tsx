import s from "./Table.module.scss";
import { useAppSelector } from "../../hooks";
import { columns } from "./columns";
import { companiesValues } from "./helper";
import { UserMoneyInput } from "../UserMoneyInput/UserMoneyInput";

export const Table = () => {
  const { loading } = useAppSelector((state) => state.data);

  const investmentTableData = useAppSelector(({ userData, data }) =>
    companiesValues(userData, data)
  );

  if (loading === "pending") {
    return <div>...Loading</div>;
  }

  return (
    <>
      <UserMoneyInput />
      <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr}>
            {columns.map((column, index) => (
              <th key={index} className={s.tr}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {investmentTableData.map((InvestmentRowData, ind) => (
            <tr key={ind} className={s.tr}>
              {columns.map((column, index) => (
                <th key={index} className={s.th}>
                  {column.cell(InvestmentRowData)}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
