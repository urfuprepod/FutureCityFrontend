import React from "react";
import { rtkHooks } from "src/app/store";
import { UserCard } from "src/entities/users/components";
import { Flex, GridLine, Title1 } from "src/shared/UI";

const UsersPage = () => {
    const { data, isLoading } = rtkHooks.useGetUsersQuery(undefined);

    if (isLoading) return null;
    return (
        <Flex $isVertical gap={20}>
            <Title1>Пользователи</Title1>

            <GridLine $isFill $minWidth={300}>
                {(data?.users ?? []).map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </GridLine>
        </Flex>
    );
};

export default UsersPage;
