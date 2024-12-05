import { ArrowLeftIcon } from "lucide-react";
import React, { FC } from "react";
import { DescriptionText, Title2 } from "src/shared/UI";

type Props = {
    title?: string;
    description?: string;
    closeShowed: () => void;
};

const ModalHeader: FC<Props> = React.memo((props) => {
    const { title, description, closeShowed } = props;

    return (
        <>
            <ArrowLeftIcon cursor={'pointer'} fontSize={30} width={30} onClick={closeShowed} />

            {title && <Title2>{title}</Title2>}
            {description && (
                <DescriptionText $mt={10}>{description}</DescriptionText>
            )}
        </>
    );
});

export default ModalHeader;
