import { useEffect, useRef, useState } from "react";
import s from "./AddCompany.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCompany } from "../../redux/initialDataSlice/initialDataSlice";

const AddCompany = () => {
	const [inputValues, setInputValues] = useState('');
	const [ticker, setTicker] = useState('');
	const [list, setList] = useState([]);
	const dispatch = useAppDispatch();
	const { securities } = useAppSelector(state => state.data)
	const companys = Object.values(securities)

	const onClickSelectCompany = (e, ticker: string) => {
		setTicker(securities[ticker].secid)
		setInputValues(e.target.innerHTML);
	}

	const onClickAddCompanyToList = () => {
		if (!list.some(item => item.ticker === ticker)) {
			const company = securities[ticker];
			const { secid, shortname, prevdate } = company;
			setList(prev => [...prev, {
				imoex: "MOEX",
				secids: secid,
				shortnames: shortname,
				ticker: secid,
				tradedate: prevdate,
				tradingsession: 0,
				weight: 0
			}]);
			setInputValues('')
			setTicker('')
		}
	}


	return <div className={s.AddCompany} >
		<div className={s.wrapper}>
			<input
				className={s.search}
				type="text"
				value={inputValues}
				onChange={(e) => setInputValues(e.target.value)} />
			<div className={s.list}>
				{inputValues.length !== 0 &&
					companys
						.filter(company => company.shortname.toLocaleLowerCase().includes(inputValues.toLocaleLowerCase()))
						.map(company => company.shortname !== inputValues
							? <div key={company.secid}
								className={s.company}
								onClick={e => onClickSelectCompany(e, company.secid)}>
								{company.shortname}
							</div>
							: null
						)
				}</div>
			<button
				className={s.btn_add}
				onClick={onClickAddCompanyToList}
				disabled={!securities[ticker]}
			>Добавить компанию</button>
		</div>
		<div>
			<table style={{ marginBottom: 20 }}>
				<thead>
					<tr >
						{['Тикер', 'Название компании', 'Вес компании'].map(header => (<th scope="col">{header}</th>))}
					</tr>
				</thead>
				<tbody>
					{list.map(item => (<tr>
						<th scope="row">{item.ticker}</th>
						<td>{item.shortnames}</td>
						<td>{item.weight}</td>
					</tr>))}
				</tbody>
			</table>
			<button style={{ width: 150 }} disabled={ticker.length === 0}>Добавить компании в список</button>
		</div>
	</div>;
};

export { AddCompany };
// indexid: "IMOEX",          === "IMOEX" по умолчанию
// secids: "AFKS",            === secid из данных
// shortnames: "Система ао",  === shortname из данных
// ticker: "AFKS",            === secid из данных
// tradedate: "2024-10-03",   === prevdate из данных
// tradingsession: 3,         === 0 по умолчанию
// weight: 0.54,              ===? НЭТ ????
