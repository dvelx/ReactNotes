import {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "../../api/user.ts";
import {queryClient} from "../../api/queryClient.ts";
import {Loader} from "../Loader";
import {UserView} from "./UserView.tsx";

interface FetchUserViewProps {
    username: string;
}

export const FetchUserView: FC<FetchUserViewProps> = ({ username }) => {
    const userQuery = useQuery(
    {
            queryFn: () => fetchUser(username),
            queryKey: ['user', username]
            },
        queryClient);

    switch (userQuery.status) {
        case "pending":
            return <Loader />;

        case "success":
            return <UserView user={userQuery.data} />

        case "error":
            return (
                <div>
                    <span>Произошла ошибка</span>

                    <button onClick={() => userQuery.refetch()}>Повторить запрос</button>
                </div>
            )
    }
}