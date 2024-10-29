import { Value } from './columns.js';
import { SelectedColumn } from './Table.js'

export const sortInvestmentValues = ({ column, direction }: SelectedColumn, data: Value[]) => {
	if (column === null) {
		return data
	}
	if (direction === 'desc') {
		return [...data].sort(column.sortFunction);
	}
	return [...data].sort(column.sortFunction).reverse();
}