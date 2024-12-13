import { FC, useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { GraphContainer, Title6 } from "src/shared/UI";
import { GraphValue, IAuthor, IDocument, ITag } from "src/shared/types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

type Props = {
    authors: IDocument[];
    tags: ITag[];
};

const colorDictionaryByFutureStatus: Record<string, string> = {
    Утопия: "#467be3",
    Антиутопия: "red",
};

function generateColors(values: GraphValue[]) {
    return values.map(
        ({ futureStatus }) =>
            colorDictionaryByFutureStatus[futureStatus ?? ""] ?? "#467be3"
    );
}

const TagsGraph: FC<Props> = (props) => {
    const { authors, tags } = props;

    const config = useMemo(() => {
        const values = authors.reduce<GraphValue[]>(
            (acc: GraphValue[], cur: IDocument) => {
                cur.tags.forEach((tag) => {
                    const current = acc.find(({ name }) => name === tag.name);
                    if (current) {
                        current.count++;
                    } else {
                        acc.push({
                            name: tag.name,
                            count: 1,
                            futureStatus: cur.status.name,
                        });
                    }
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
                    borderColor: generateColors(values),
                    backgroundColor: generateColors(values),
                    borderWidth: 1,
                },
            ],
        };

        return {
            data,
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
                    // max: config.maxValue,
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
                display: false,
            },
        },
    };

    return (
        <GraphContainer>
            <Title6>Тэги</Title6>
            <div style={{ width: "100%" }}>
                <Bar options={options} height={400} data={config.data} />
            </div>
        </GraphContainer>
    );
};

export default TagsGraph;
