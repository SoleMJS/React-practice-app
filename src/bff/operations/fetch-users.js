import { getUsers } from "../api";
import { ROLE } from "../constants/role";
import { sessions } from "../sessions";

export const fetchUsers = async (hash) => {
	const accessRoles = [ROLE.ADMIN];

	const acces = await sessions.access(hash, accessRoles);

	if (!acces) {
		return {
			error: "Доступ запрещён",
			res: null,
		};
	}

	const users = await getUsers();
	return {
		error: null,
		res: users,
	};
};
