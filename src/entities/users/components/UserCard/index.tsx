import { FC } from "react";
import { rtkHooks } from "src/app/store";
import { IUser } from "src/shared/types";
import { DescriptionText, Flex, Title3 } from "src/shared/UI";
import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
    user: IUser;
};

const UserCard: FC<Props> = (props) => {
    const {
        user: { lastName, firstName, login, id, isAdmin },
    } = props;

    const [changeAdminStatus] = rtkHooks.useChangeAdminStatusMutation();

    return (
        <Flex
            gap={20}
            align="flex-start"
            justify="space-between"
            className={styles.container}
        >
            <Flex $isVertical gap={8}>
                <Title3>{login}</Title3>
                <DescriptionText>
                    {[lastName, firstName].join(" ")}
                </DescriptionText>
            </Flex>

            <span
                style={{ cursor: "pointer" }}
                aria-label="rating"
                onClick={() => {
                    changeAdminStatus(id);
                }}
            >
                <svg
                    className={classNames(styles.star, {
                        [styles.active]: isAdmin,
                    })}
                    width="32"
                    height="32"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                >
                    <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
                </svg>
            </span>
        </Flex>
    );
};

export default UserCard;
