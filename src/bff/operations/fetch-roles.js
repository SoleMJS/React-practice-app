import { getRoles } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const fetchRoles = async (hash) => {
	const accessRoles = [ROLE.ADMIN];

	const acces = await sessions.access(hash, accessRoles);

	if (!acces) {
		return {
			error: "Доступ запрещён",
			res: null,
		};
	}

	const roles = await getRoles();
	return {
		error: null,
		res: roles,
	};
};
