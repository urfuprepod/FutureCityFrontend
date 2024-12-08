import { FC } from "react";
import { FilterSelect } from "src/entities/main";
import { AvailableFilterValue, FilterFabric } from "src/shared/types";
import { GridLayout, Input } from "src/shared/UI";

type Props = {
    filters: FilterFabric[];
    itemsInRow?: number;
    value: {
        [key: string]: AvailableFilterValue;
    };
    onChangeFilters: (key: string, value: AvailableFilterValue) => void;
};
const FiltersGrid: FC<Props> = (props) => {
    const { filters, itemsInRow, value, onChangeFilters } = props;

    return (
        <GridLayout $inRow={itemsInRow}>
            {filters.map((el) =>
                el.type === "input" ? (
                    <Input
                        key={el.name}
                        placeholder={el.placeholder ?? "Введите"}
                        value={String(value[el.name])}
                        onChange={(e) =>
                            onChangeFilters(el.name, e.target.value)
                        }
                    />
                ) : (
                    <FilterSelect
                        key={el.name}
                        placeholder={el.placeholder}
                        value={value[el.name]}
                        updateItems={(val: AvailableFilterValue) =>
                            onChangeFilters(el.name, val)
                        }
                        items={el.options!}
                        isMulti={el.isMulti}
                        labelField={el.labelField}
                    />
                )
            )}
        </GridLayout>
    );
};

export default FiltersGrid;
