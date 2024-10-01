import s from "./Table.module.scss";
import { useAppSelector } from "../../hooks";
import { columns } from "./columns";
import { selectInvestmentValues } from "./createSelector";
export const Table = () => {
  const { loading } = useAppSelector((state) => state.data); // достаем как обычные selector но без
  const investmentValues = useAppSelector(selectInvestmentValues); // select

  if (loading === "pending") {
    return <div>...Loading</div>;
  }

  return (
    <>
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
          {investmentValues.map((value, index) => (
            <tr key={index} className={s.tr}>
              {columns.map((column, index) => (
                <th key={index} className={s.th}>
                  {column.cell(value)}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
