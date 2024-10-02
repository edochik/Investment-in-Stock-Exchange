import { Value } from './columns.js';
import { SelectedColumn } from './Table'

export const sortInvestmentValues = ({ column, direction }: SelectedColumn, data: Value[]) => {
	if (column === null) {
		return data
	}
	if (direction === 'desc') {
		return data.toSorted(column.sortFunction);
	}
	return data.toSorted(column.sortFunction).reverse();
}