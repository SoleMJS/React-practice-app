import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { savePostAsync } from "../../../../actions";
import { Icon, Input } from "../../../../components";
import { PROP_TYPE } from "../../../../constants";
import { useServerRequest } from "../../../../hooks";
import { SpecialPanel } from "../special-panel/special-panel";
import { sanizeContent } from "./utils";

const PostFormContainer = ({
	className,
	post: { id, title, imageURL, content, publishedAt },
}) => {
	const [imageURLValue, setImageURLValue] = useState(imageURL);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageURLValue(imageURL);
		setTitleValue(title);
	}, [imageURL, title]);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onSave = () => {
		const newContent = sanizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageURL: imageURLValue,
				title: titleValue,
				content: newContent,
			})
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageChange = ({ target }) => setImageURLValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);

	return (
		<div className={className}>
			<Input
				onChange={onImageChange}
				value={imageURLValue}
				placeholder="Изображение..."
			/>
			<Input
				onChange={onTitleChange}
				value={titleValue}
				placeholder="Заголовок..."
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={
					<Icon
						id="fa-floppy-o"
						margin="0 20px 0 0"
						onClick={onSave}
					/>
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		min-height: 80px;
		border: 1px solid #000;
		font-size: 18px;
		white-space: pre-line;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
