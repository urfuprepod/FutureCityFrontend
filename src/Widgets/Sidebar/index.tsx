import { FC, useState } from "react";
import { Flex, Sidebar, SidebarMenuButton } from "src/shared/UI";
import SidebarIcon from "src/assets/icons/arrow.svg";
import { routes } from "src/shared/constants";
import CustomLink from "./CustomLink";
import { useGetCurrentUser } from "src/app/hooks";
import { IRoute, IUser } from "src/shared/types";

type Props = {
    user?: IUser;
    actualRoutes: IRoute[];
};
const SideBar: FC<Props> = ({ user, actualRoutes }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Sidebar $collapsed={isCollapsed}>
            <SidebarMenuButton
                $collapsed={isCollapsed}
                onClick={() => setIsCollapsed((prev) => !prev)}
            >
                <img
                    style={{ userSelect: "none" }}
                    width={15}
                    height={15}
                    src={SidebarIcon}
                    alt="icon"
                />
            </SidebarMenuButton>

            <Flex $isVertical gap={15} align="flex-start">
                {actualRoutes
                    .filter((el) => el.inDrawer !== false)
                    .map((el) => (
                        <CustomLink url={el.path} key={el.name}>
                            {el.Icon} {isCollapsed && el.name}
                        </CustomLink>
                    ))}
            </Flex>
        </Sidebar>
    );
};

export default SideBar;
