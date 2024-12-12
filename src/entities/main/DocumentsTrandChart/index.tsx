import { FC, useMemo } from "react";
import { GraphValue, IDocument } from "src/shared/types";
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
import { Line } from "react-chartjs-2";
import { GraphContainer, Title6 } from "src/shared/UI";

type Props = {
    documents: IDocument[];
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

function generateTagDataName(value: number): string {
    const period = Math.floor(value / 10);
    const decade = `${String(period) + "0"}-${String(period + 1) + "0"}`;

    return decade;
}

const DocumentsTrandChart: FC<Props> = ({ documents }) => {
    const config = useMemo(() => {
        const values = documents.reduce<GraphValue[]>(
            (acc: GraphValue[], cur: IDocument) => {
                const current = acc.find(
                    ({ name }) => name === generateTagDataName(cur.year)
                );
                if (current) {
                    current.count++;
                } else {
                    acc.push({
                        name: generateTagDataName(cur.year),
                        count: 1,
                    });
                }
                return acc;
            },
            []
        );
        values.sort((a, b) => a.name.localeCompare(b.name));

        const data = {
            labels: values.map(({ name }) => name),
            datasets: [
                {
                    label: "Количество статей",
                    data: values.map(({ count }) => count),
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    lineTension: 1,
                },
            ],
        };

        return {
            data,
            maxValue: Math.max(...values.map(({ count }) => count)),
        };
    }, [documents]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const,
            },
            title: {
                display: false,
                text: "Chart.js Line Chart",
            },
        },
    };

    return (
        <GraphContainer $max>
            <Title6>Статьи по годам</Title6>
            <div style={{ height: 500, width: "100%" }}>
                <Line options={options} data={config.data} height={'100%'} />
            </div>
        </GraphContainer>
    );
};

export default DocumentsTrandChart;
