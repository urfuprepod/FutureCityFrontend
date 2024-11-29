import { FC, useMemo } from "react";
import { CityFuture, IDocument } from "src/shared/types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { GraphContainer, Title6 } from "src/shared/UI";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    documents: IDocument[];
};

const indexes: Record<CityFuture, number> = {
    Utopia: 0,
    Antiutopia: 1,
};

const AuthorsDoughnut: FC<Props> = ({ documents }) => {
    const parsedDocuments = useMemo(() => {
        return documents.reduce<[number, number]>(
            (acc: [number, number], cur: IDocument) => {
                acc[cur.futureStatusId] = acc[cur.futureStatusId] + 1;
                return acc;
            },
            [0, 0]
        );
    }, [documents]);

    const data = {
        labels: ["Утопии", "Антиутопии"],
        datasets: [
            {
                label: "Количество статей",
                data: parsedDocuments,
                backgroundColor: ["#38956E", "#EE3737"],
                borderColor: ["#38956E", "#EE3737"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <GraphContainer>
            <Title6>Статьи</Title6>
            <div style={{ height: 400, width: "100%" }}>
                <Doughnut
                    data={data}
                    options={{
                        plugins: {
                            legend: {
                                position: "bottom" as const,
                            },
                        },
                    }}
                    height={400}
                />
            </div>
        </GraphContainer>
    );
};

export default AuthorsDoughnut;
