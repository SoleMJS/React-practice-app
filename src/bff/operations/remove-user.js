import { deleteUser } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const removeUser = async (hash, userId) => {
	const accessRoles = [ROLE.ADMIN];

	const acces = await sessions.access(hash, accessRoles);

	if (!acces) {
		return {
			error: "Доступ запрещён",
			res: null,
		};
	}

	deleteUser(userId);

	return {
		error: null,
		res: true,
	};
};
