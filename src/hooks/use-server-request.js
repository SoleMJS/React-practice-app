import { useCallback } from "react";
import { useSelector } from "react-redux";
import { server } from "../bff";
import { selectUserSession } from "../selectors";

export const useServerRequest = () => {
	const session = useSelector(selectUserSession); // запрашиваю сессию из редакс стора и все она в замыкании лежит
	// данные для запроса, будут включать сессию либо нет
	return useCallback(
		(operation, ...params) => {
			const request = [
				"register",
				"authorize",
				"fetchPost",
				"fetchPosts",
			].includes(operation)
				? params
				: [session, ...params];
			return server[operation](...request);
		},
		[session]
	); // записываю в сервер
};
