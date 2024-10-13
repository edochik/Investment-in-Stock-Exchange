import { Security } from "../../domain/Security.js";

export const filterByKey = (security: Security, value: string) => {
	return (
		// security.shortname.toLowerCase().startsWith(value.toLowerCase()) || ??
		// security.secid.toLowerCase().startsWith(value.toLowerCase()) || ??
		(security.secid.toLowerCase() + " " + security.shortname.toLowerCase()).includes(value.toLowerCase())
	);
};
