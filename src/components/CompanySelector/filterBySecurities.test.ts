import { ClientSecurity } from "../../domain/ClientSecurity"
import { Security } from "../../domain/Security"
import { filterBySecurities } from "./filterBySecurities"

test('Тест функции filterBySecurities', () => {
	const securities = {
		a: {
			secid: 'a'
		},
		b: {
			secid: 'b'
		},
		c: {
			secid: 'c'
		}
	} as unknown as Record<string, Security>
	const companies = [{ ticker: 'a' }, { ticker: 'b' }] as unknown as ClientSecurity[]
	const result = filterBySecurities(securities, companies);
	expect(result).toStrictEqual([{ secid: 'c' }])
})