import { ROLE } from "../constants/role";

const initialPostsState = {
	session: null,
	id: null,
	login: null,
	roleId: ROLE.GUEST,
};

export const postsReducer = (state = initialPostsState, action) => {
	const { type } = action;
	switch (type) {
		default:
			return state;
	}
};
