import { FC, useState } from "react";
import {
    Panel,
    PanelHeader,
    Group,
    Div,
    NavIdProps,
    List,
    SimpleCell,
    Spinner,
    Placeholder,
    Spacing,
    Avatar,
    Button,
} from "@vkontakte/vkui";
import { Icon28SmileOutline } from "@vkontakte/icons";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useGetMoodHistory } from "../../hooks/useGetMoodHistory";
import { MOODS } from "../../const";
import styles from "./History.module.css";
import { MoodsChart } from "../ui/MoodsChart/MoodsChart";
import { parseHistoryToChartData } from "../../utils/parseHistoryToChartData";

export interface HistoryProps extends NavIdProps {
    fetchedUser?: UserInfo;
}

export const History: FC<HistoryProps> = ({ id, fetchedUser }) => {
    const { first_name, photo_200 } = { ...fetchedUser };
    const { history, isLoading } = useGetMoodHistory();
    const [historyPeriod, setHistoryPeriod] = useState<number>(7);
    const historyToShow = history?.slice(-historyPeriod).reverse() || [];

    return (
        <Panel id={id}>
            <PanelHeader>История настроения</PanelHeader>
            <MoodsChart data={parseHistoryToChartData(history || [])} />
            <Group>
                <Div className={styles.userInfo}>
                    {photo_200 && <Avatar src={photo_200} size={48} />}
                    <div style={{ fontWeight: 500 }}>
                        {first_name ? (
                            <>
                                {first_name}, вот твоя история настроения в этом
                                приложении
                            </>
                        ) : (
                            "Ваша история настроения"
                        )}
                    </div>
                </Div>
                <Spacing size={20} />
                {isLoading ? (
                    <Div>
                        <Spinner size="xl" />
                    </Div>
                ) : historyToShow.length === 0 ? (
                    <Placeholder
                        icon={<Icon28SmileOutline />}
                        title="Здесь пока пусто"
                    >
                        Вы ещё не отмечали своё настроение
                    </Placeholder>
                ) : (
                    <div>
                        <List className={styles.historyWrapper}>
                            {historyToShow.map((h) => {
                                const mood = MOODS.find(
                                    (m) => m.value === h.mood.value
                                );
                                return (
                                    <SimpleCell
                                        className={styles.historyItem}
                                        key={h.date}
                                        before={
                                            <span className={styles.emoji}>
                                                {mood?.emoji || "🙂"}
                                            </span>
                                        }
                                        after={
                                            <span className={styles.dateBlock}>
                                                {h.date}
                                            </span>
                                        }
                                        subtitle={
                                            h.note ? (
                                                <span
                                                    className={styles.hasNote}
                                                >
                                                    {h.note}
                                                </span>
                                            ) : (
                                                <span
                                                    className={
                                                        styles.withoutNote
                                                    }
                                                >
                                                    — без заметки —
                                                </span>
                                            )
                                        }
                                        disabled
                                    >
                                        {mood?.label || h.mood.value}
                                    </SimpleCell>
                                );
                            })}
                        </List>
                        {history && history.length > historyPeriod ? (
                            <Button
                                className={styles.loadMoreButton}
                                onClick={() =>
                                    setHistoryPeriod(historyPeriod + 7)
                                }
                            >
                                Загрузить больше
                            </Button>
                        ) : null}
                    </div>
                )}
            </Group>
        </Panel>
    );
};
