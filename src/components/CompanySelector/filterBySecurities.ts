import { Security } from "../../domain/Security";
import { ClientSecurity } from "../../domain/ClientSecurity.js";

export function filterBySecurities(
  securities: Record<string, Security>,
  companies: ClientSecurity[]
) {
  const map = new Set(companies.map((item) => item.ticker)); 
  return Object.values(securities).filter(
    (security) => !map.has(security.secid)
  );
}


