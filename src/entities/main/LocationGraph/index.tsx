// import React, { FC } from "react";

// type Props = {
//     grouped: Record<string, number>;
// };
// const LocationGraph: FC<Props> = ({ grouped }) => {
//     const keys = Object.keys(grouped);
//     const values = Object.values(grouped);

//     const options = {
//         indexAxis: "y" as const,
//         elements: {
//             bar: {
//                 borderWidth: 2,
//             },
//         },

//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             x: {
//                 stacked: true,
//                 ticks: {
//                     min: 0,
//                     max: Math.max(...values) + 2,
//                     stepSize: 1,
//                 },
//                 grid: {
//                     drawBorder: false,
//                     display: false,
//                 },
//             },
//             y: {
//                 stacked: true,
//             },
//         },
//         plugins: {
//             legend: {
//                 position: "bottom" as const,
//             },
//         },
//     };

//     const data = {
//       labels: keys,
//       datasets: [
//           {
//               label: "Утопии",
//               data: authors.reduce<number[]>(
//                   (acc: number[], cur: IAuthor) => {
//                       acc.push(
//                           cur.documents.filter(
//                               (el) => el.futureStatusId === 0
//                           ).length
//                       );
//                       return acc;
//                   },
//                   []
//               ),
//               borderColor: "#467be3",
//               backgroundColor: "#467be3",
//           },
//           {
//               label: "Антиутопии",
//               data: authors.reduce<number[]>(
//                   (acc: number[], cur: IAuthor) => {
//                       acc.push(
//                           cur.documents.filter(
//                               (el) => el.futureStatusId === 1
//                           ).length
//                       );
//                       return acc;
//                   },
//                   []
//               ),
//               borderColor: "#67EC9C",
//               backgroundColor: "#67EC9C",
//           },
//       ],
//   };

//     return <div>LocationGraph</div>;
// };

// export default LocationGraph;
