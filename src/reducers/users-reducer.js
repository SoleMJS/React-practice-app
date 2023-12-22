import { ROLE } from "../constants/role";

const initialUsersState = {
	session: null,
	id: null,
	login: null,
	roleId: ROLE.GUEST,
};

export const usersReducer = (state = initialUsersState, action) => {
	const { type } = action;
	switch (type) {
		default:
			return state;
	}
};
