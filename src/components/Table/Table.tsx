import s from "./Table.module.scss";
import { useAppSelector } from "../../hooks";
import { columns } from "./columns";

export const Table = () => {
  const { loading } = useAppSelector((state) => state.data);
  const table = useAppSelector((state) => state.table);
  const sumStocks = useAppSelector((state) => state.sumStocks);
  const coefficient = useAppSelector((state) => state.coefficient);

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
          {table.map((row, ind) => (
            <tr key={ind} className={s.tr}>
              {columns.map((column, index) => (
                <th key={index} className={s.th}>
                  {column.cell(row, sumStocks, coefficient, table)}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
