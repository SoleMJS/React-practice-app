import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { PAGINATION_LIMIT } from "../../constants";
import { useServerRequest } from "../../hooks";
import { Pagination, PostCard, Search } from "./components";
import { debounse, getLastPageFromLinks } from "./utils";

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState("");
	const [shouldSearch, setShouldSearch] = useState(false);
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer("fetchPosts", searchPhrase, page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPosts(posts);
				setLastPage(getLastPageFromLinks(links));
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(
		() => debounse(setShouldSearch, 2000),
		[]
	);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{posts.length ? (
					<div className="post-list">
						{posts.map(
							({
								id,
								imageUrl,
								title,
								publishedAt,
								commentsCount,
							}) => (
								<PostCard
									imageUrl={imageUrl}
									key={id}
									id={id}
									title={title}
									publishedAt={publishedAt}
									commentsCount={commentsCount}
								/>
							)
						)}
					</div>
				) : (
					<div className="no-posts-fount">Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && posts.length > 0 && (
				<Pagination setPage={setPage} page={page} lastPage={lastPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
	}

	& .no-posts-fount {
		text-align: center;
		font-size: 18px;
		margin-top: 40px;
	}
`;
