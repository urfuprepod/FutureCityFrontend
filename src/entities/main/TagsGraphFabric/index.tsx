import React, { FC, useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { GraphContainer, Title6 } from "src/shared/UI";
import { IAuthor, IDocument, ITag } from "src/shared/types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type Props = {
    authors: IAuthor[];
    filterName: keyof IDocument | keyof ITag;
};

type GraphValue = {
    name: string;
    count: number;
};

function generateTagDataName(
    key: keyof IDocument | keyof ITag,
    value: any
): string {
    const period = Math.floor((value as number) / 10);
    const decade = `${String(period) + "0"}-${String(period + 10) + "0"}`;

    switch (key) {
        case "year":
            return decade;
        default:
            return String(value);
    }
}

const TagsGraphFabric: FC<Props> = (props) => {
    const { authors, filterName } = props;

    const config = useMemo(() => {
        const max = Math.max(...authors.map((el) => el.documents.length));

        const values = authors.reduce<GraphValue[]>(
            (acc: GraphValue[], cur: IAuthor) => {
                cur.documents.forEach((el) => {
                    el.tags.forEach((tag) => {
                        const current = acc.find(
                            // ({ name }) => name === generateTagDataName(filterName, filterName in tag && tag[filterName as keyof ITag] || ) tag.name
                            ({ name }) => name === tag.name
                        );
                        if (current) {
                            current.count++;
                        } else {
                            acc.push({ name: tag.name, count: 1 });
                        }
                    });
                });
                return acc;
            },
            []
        );
        values.sort((a, b) => b.count - a.count);

        const data = {
            labels: values.map(({ name }) => name),
            datasets: [
                {
                    label: "Количество статей",
                    data: values.map(({ count }) => count),
                    borderColor: "#467be3",
                    backgroundColor: "#467be3",
                    borderWidth: 1,
                },
            ],
        };

        return {
            data,
            maxValue: max,
        };
    }, [authors]);

    const options = {
        indexAxis: "y" as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    min: 0,
                    max: config.maxValue,
                    stepSize: 1,
                },
                grid: {
                    drawBorder: false,
                    display: false,
                },
            },
            y: {
                stacked: true,
            },
        },
        plugins: {
            legend: {
                position: "bottom" as const,
            },
        },
    };

    return (
        <GraphContainer $max>
            <Title6>Теги</Title6>
            <div style={{ width: "100%" }}>
                <Bar options={options} height={400} data={config.data} />
            </div>
        </GraphContainer>
    );
};

export default TagsGraphFabric;
