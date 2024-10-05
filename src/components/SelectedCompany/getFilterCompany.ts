export function getFilterCompany(
  securities: Record<string, Security>,
  imoex: ImoexSecurity[]
) {
  const dictionary = new Set(imoex.map((item) => item.ticker));
  return Object.values(securities).filter(
    (security) => !dictionary.has(security.secid)
  );
}
