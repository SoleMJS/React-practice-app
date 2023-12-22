import { transformerComment } from "../transformers";

const ALL_COMMNETS_URL = "http://localhost:3005/comments";
const POST_COMMENTS_URL = "http://localhost:3005/comments?post_id=";

export const getComments = (postId) => {
	const url =
		postId === undefined ? ALL_COMMNETS_URL : POST_COMMENTS_URL + postId;
	return fetch(url)
		.then((loadedComments) => loadedComments.json())
		.then((loadedComments) => loadedComments.map(transformerComment));
};
