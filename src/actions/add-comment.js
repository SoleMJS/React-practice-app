import { ACTION_TYPE } from "./action-types";

export const addComment = (comment) => ({
	type: ACTION_TYPE.ADD_COMMENT,
	payload: comment,
});
