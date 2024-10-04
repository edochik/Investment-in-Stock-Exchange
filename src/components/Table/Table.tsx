import s from "./Table.module.scss";
import { useAppSelector } from "../../hooks";
import { Columns, columns } from "./columns";
import { selectInvestmentValues } from "./createSelector";
import { useState } from "react";
import { sortInvestmentValues } from "./sortInvesmentValues";
import classNames from "classnames";
export interface SelectedColumn {
  direction: "desc" | "asc";
  column: Columns | null;
}

export const Table = () => {
  const [selectedColumn, setSelectedColumn] = useState<SelectedColumn>({
    direction: "desc",
    column: null,
  });

  const investmentValues = useAppSelector(selectInvestmentValues);

  const onClickSortHeader = (column: Columns) => {
    setSelectedColumn((prev) => {
      if (prev.column !== column) {
        return {
          direction: "desc",
          column,
        };
      }
      return {
        direction: prev.direction === "desc" ? "asc" : "desc",
        column,
      };
    });
  };

  return (
    <>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr}>
            {columns.map((column, index) => (
              <th key={index} className={s.th}>
                <button
                  className={classNames({
                    [s.button]: true,
                    [s.show]: column === selectedColumn.column,
                    [s.rotate]: selectedColumn.direction === "desc",
                  })}
                  onClick={() => onClickSortHeader(column)}
                  disabled={column.sortFunction === undefined}
                >
                  {column.header}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {sortInvestmentValues(selectedColumn, investmentValues).map(
            (value) => (
              <tr key={value.ticker} className={s.tr}>
                {columns.map((column, index) => (
                  <th key={index} className={s.th}>
                    {column.cell(value)}
                  </th>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};
