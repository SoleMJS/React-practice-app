import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { RESET_POST_DATA, loadPostAsync } from "../../actions";
import { Error, PrivateContent } from "../../components";
import { ROLE } from "../../constants";
import { useServerRequest } from "../../hooks";
import { selectPost } from "../../selectors";
import { Comments, PostContent, PostForm } from "./components";

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const { id } = useParams();
	const isEditing = !!useMatch("/post/:id/edit");
	const isCreating = !!useMatch("/post");
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}
		dispatch(loadPostAsync(requestServer, id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [dispatch, id, requestServer, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage = () =>
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<>
				<div className={className}>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={id} />
				</div>
			</>
		);

	return error ? <Error error={error} /> : <SpecificPostPage />;
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
