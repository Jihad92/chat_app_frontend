import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import { UserModel } from "../models/User";

interface UserResponse {
	username: string;
	name: string;
	url: string;
}

export function Conversations() {
	const { user } = useContext(AuthContext);
	const [users, setUsers] = useState<UserResponse[]>([]);

	useEffect(() => {
		async function fetchUsers() {
			const res = await fetch("http://127.0.0.1:8000/api/users/all/", {
				headers: {
					Authorization: `Token ${user?.token}`,
				},
			});
			const data = await res.json();
			setUsers(data);
		}
		fetchUsers();
	}, [user]);

	const createConversationName = (username: string) => {
		const namesAlpha = [user?.username, username].sort();
		return `${namesAlpha[0]}__${namesAlpha[1]}`;
	};

	return (
		<div>
			{users
				.filter((u: UserResponse) => u.username !== user?.username)
				.map((u: UserResponse) => (
					<Link
						key={u.username}
						to={`chats/${createConversationName(u.username)}`}>
						<div>{u.username}</div>
					</Link>
				))}
		</div>
	);
}
