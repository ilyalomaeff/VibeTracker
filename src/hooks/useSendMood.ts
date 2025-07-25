import vkBridge from "@vkontakte/vk-bridge";
import { getTodaysDateString } from "../utils/getTodaysDateString";
import { HistoryItem, History } from "../types";
import { useGetMoodStats } from "./useGetMoodStats";

type IUseSendMoodProps = Omit<HistoryItem, "date"> & {
    history: History;
};

export const useSendMood = () => {
    const stats = useGetMoodStats();
    const sendMood = async ({ mood, note, history }: IUseSendMoodProps) => {
        const todayDateKey = getTodaysDateString();
        const newHistory = [
            ...history.filter((item) => item.date !== todayDateKey),
            { mood, note, date: todayDateKey },
        ];
        vkBridge.send("VKWebAppStorageSet", {
            key: `mood_history`,
            value: JSON.stringify(newHistory),
        });

        const statsKey = `mood_stats_${todayDateKey}`;
        const statData = stats;
        if (!statData) return;

        statData[mood.value] += 1;
        vkBridge.send("VKWebAppStorageSet", {
            key: statsKey,
            value: JSON.stringify(statData),
        });
    };
    return sendMood;
};
