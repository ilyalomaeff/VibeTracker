import vkBridge from "@vkontakte/vk-bridge";
import { useEffect, useState } from "react";
import { getTodaysDateString } from "../utils/getTodaysDateString";
import { Stats } from "../types";

export const useGetMoodStats = (): Stats | null => {
    const [moodStats, setMoodStats] = useState(null);
    useEffect(() => {
        (async () => {
            const dayKey = getTodaysDateString();
            vkBridge
                .send("VKWebAppStorageGet", { keys: [`mood_stats_${dayKey}`] })
                .then((data) => {
                    const history = data.keys[0].value
                        ? JSON.parse(data.keys[0].value)
                        : {};
                    setMoodStats(history);
                })
                .catch(() => {});
        })();
    }, []);
    return moodStats;
};
