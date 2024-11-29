import { useState } from "react";
import { Flex, Sidebar, SidebarMenuButton } from "src/shared/UI";
import SidebarIcon from "src/assets/icons/arrow.svg";
import { routes } from "src/shared/constants";
import CustomLink from "./CustomLink";

const SideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Sidebar $collapsed={isCollapsed}>
            <SidebarMenuButton
                $collapsed={isCollapsed}
                onClick={() => setIsCollapsed((prev) => !prev)}
            >
                <img style={{userSelect: 'none'}} width={15} height={15} src={SidebarIcon} alt="icon" />
            </SidebarMenuButton>

            <Flex $isVertical gap={15} align="center">
                {routes.map((el) => (
                    <CustomLink url={el.path} key={el.name}>
                        {el.Icon} {isCollapsed && el.name}
                    </CustomLink>
                ))}
            </Flex>
        </Sidebar>
    );
};

export default SideBar;
