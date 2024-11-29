import { FC, useMemo } from "react";
import ReactSelect, { SingleValue } from "react-select";
import { AvailableFilterValue, IAuthor } from "src/shared/types";
import "./styles.css";

type NewProps<T> = {
    value: AvailableFilterValue;
    items: T[];
    updateItems: (id: AvailableFilterValue) => void;
    labelField?: keyof T;
    placeholder?: string;
    noOptionsMessage?: string;
    isMulti?: boolean;
};
function FilterSelect<T extends { id: number }>(props: NewProps<T>) {
    const {
        items,
        value,
        updateItems,
        placeholder,
        isMulti,
        noOptionsMessage,
        labelField,
    } = props;

    const config = useMemo(() => {
        const currentIsMulti = Array.isArray(items) && isMulti !== false;

        const options = items.map((el) => ({
            label: el[labelField ?? "id"],
            value: String(el.id),
        }));
        const values = Array.isArray(value)
            ? options.filter((el) => value.includes(el.value))
            : options.find((el) => el.value === value);

        return {
            isMulti: currentIsMulti,
            value: values,
            options,
        };
    }, [items, labelField, value]);

    return (
        <ReactSelect
            className="select"
            classNamePrefix={"select"}
            placeholder={placeholder ?? "Все элементы"}
            noOptionsMessage={() => (
                <span> {noOptionsMessage ?? "Больше элементов нет..."} </span>
            )}
            isMulti={config.isMulti}
            isClearable
            value={config.value}
            onChange={(values) =>
                updateItems(
                    Array.isArray(values)
                        ? values.map((el) => el.value)
                        : (
                              values as SingleValue<{
                                  label: T[keyof T | "id"];
                                  value: string;
                              }>
                          )?.value ?? null
                )
            }
            options={config.options}
        />
    );
}

export default FilterSelect;
