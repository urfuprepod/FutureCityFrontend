import React, { FC } from "react";
import { GraphContainer, Title6 } from "src/shared/UI";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

type Props = {
    grouped: Record<string, Record<number, number>>;
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LocationGraph: FC<Props> = ({ grouped }) => {
    const keys = Object.keys(grouped);
    const values = Object.values(grouped);

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
                    // max: Math.max(...values) + 2,
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
        labels: keys,
        datasets: [
            {
                label: "Утопии",
                data: values.map((el) => el[0] ?? 0),
                borderColor: "#467be3",
                backgroundColor: "#467be3",
            },
            {
                label: "Антиутопии",
                data: values.map((el) => el[1] ?? 0),
                borderColor: "#67EC9C",
                backgroundColor: "#67EC9C",
            },
        ],
    };

    return (
        <GraphContainer>
            <Title6>Статьи по месту написания</Title6>
            <div style={{ height: 400, width: '100%' }}>
                <Bar options={options} data={data} />
            </div>
        </GraphContainer>
    );
};

export default LocationGraph;
