import { addPost, updatePost } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const savePost = async (hash, newPostData) => {
	const accessRoles = [ROLE.ADMIN];

	const acces = await sessions.access(hash, accessRoles);

	if (!acces) {
		return {
			error: "Доступ запрещён",
			res: null,
		};
	}

	const savedPost =
		newPostData.id === ""
			? await addPost(newPostData)
			: await updatePost(newPostData);

	return {
		error: null,
		res: savedPost,
	};
};
