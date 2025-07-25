import vkBridge from "@vkontakte/vk-bridge";
import { useEffect, useState } from "react";
import { History } from "../types";

export const useGetMoodHistory = () => {
    const [moodHistory, setMoodHistory] = useState<History | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        (async () => {
            vkBridge
                .send("VKWebAppStorageGet", { keys: ["mood_history"] })
                .then((data) => {
                    const history = data.keys[0].value
                        ? JSON.parse(data.keys[0].value)
                        : [];
                    const sortedHistory = history.sort(
                        (a: { date: string }, b: { date: string }) =>
                            a.date.localeCompare(b.date)
                    );
                    setIsLoading(false);
                    setMoodHistory(sortedHistory);
                })
                .catch(() => []);
        })();
    }, []);

    return { history: moodHistory, isLoading };
};
