import { ImoexSecurity } from "../../domain/ImoexSecurity.js";
import { Security } from "../../domain/Security.js";

export function filterBySecurities(
  securities: Record<string, Security>,
  companies: ImoexSecurity[]
) {
  const map = new Set(companies.map((item) => item.ticker));
  return Object.values(securities).filter(
    (security) => !map.has(security.secid)
  );
}
