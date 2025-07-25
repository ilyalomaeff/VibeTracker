import { FC } from "react";
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import styles from "./MoodsChart.module.css";

export interface MoodsChartProps {
    data: Array<{ emoji: string; number: number }>;
}

export const MoodsChart: FC<MoodsChartProps> = ({ data }) => {
    return (
        <div className={styles.chartContainter}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={200}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="emoji" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                        dataKey="number"
                        fill="#8884d8"
                        activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
