import { FC, PropsWithChildren } from "react";
import { GridLine } from "../../shared/UI";

type Props = {
    minWidth: number;
};

const ItemsList: FC<PropsWithChildren<Props>> = (props) => {
    const { minWidth, children } = props;

    return <GridLine $minWidth={minWidth}>{children}</GridLine>;
};

export default ItemsList;
