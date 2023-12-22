import { generateDate } from "../utils";

export const addPost = ({ imageURL, title, content }) =>
	fetch("http://localhost:3005/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			image_url: imageURL,
			published_at: generateDate(),
			title,
			content,
		}),
	}).then((createdPost) => createdPost.json());
