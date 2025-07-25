import { History } from "../types";

export const parseHistoryToChartData = (
    history: History
): Array<{ emoji: string; number: number }> => {
    const parsedData = new Map([
        ["😊", 0],
        ["😢", 0],
        ["🤩", 0],
        ["😌", 0],
        ["😴", 0],
    ]);

    for (const item of history) {
        parsedData.set(
            item.mood.emoji || "😊",
            parsedData.get(item.mood.emoji || "😊")! + 1
        );
    }

    return Array.from(parsedData, ([emoji, number]) => ({
        emoji,
        number,
    }));
};
