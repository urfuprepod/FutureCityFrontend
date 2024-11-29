import { FC, useMemo } from "react";
import { IAuthor } from "src/shared/types";
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

type Props = {
    authors: IAuthor[];
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AuthorsGraph: FC<Props> = ({ authors }) => {
    const config = useMemo(() => {
        const max = Math.max(...authors.map((el) => el.documents.length));

        return {
            names: authors.map(({ fullName }) => {
                const parsed = fullName.split(" ");
                return parsed
                    .map((el, id) => (id === 0 ? el : el[0] + "."))
                    .join(" ");
            }),
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

    const data = {
        labels: config.names,
        datasets: [
            {
                label: "Утопии",
                data: authors.reduce<number[]>(
                    (acc: number[], cur: IAuthor) => {
                        acc.push(
                            cur.documents.filter(
                                (el) => el.futureStatusId === 0
                            ).length
                        );
                        return acc;
                    },
                    []
                ),
                borderColor: "#467be3",
                backgroundColor: "#467be3",
            },
            {
                label: "Антиутопии",
                data: authors.reduce<number[]>(
                    (acc: number[], cur: IAuthor) => {
                        acc.push(
                            cur.documents.filter(
                                (el) => el.futureStatusId === 1
                            ).length
                        );
                        return acc;
                    },
                    []
                ),
                borderColor: "#67EC9C",
                backgroundColor: "#67EC9C",
            },
        ],
    };

    return (
        <GraphContainer>
            <Title6>Авторы</Title6>
            <div style={{ width: "100%" }}>
                <Bar options={options} height={400} data={data} />
            </div>
        </GraphContainer>
    );
};

export default AuthorsGraph;
