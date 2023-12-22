export const updatePost = ({ id, imageURL, title, content }) =>
	fetch(`http://localhost:3005/posts/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			image_url: imageURL,
			title,
			content,
		}),
	}).then((loadedPost) => loadedPost.json());
