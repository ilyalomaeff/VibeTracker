import { FC } from "react";
import { Header, Button, Group, Div } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import styles from "./AlreadySelectedMoodPage.module.css";

export interface AlreadySelectedMoodPageProps {
    fetchedUser?: UserInfo;
    changeTodaysMood: () => void;
}

export const AlreadySelectedMoodPage: FC<AlreadySelectedMoodPageProps> = ({
    fetchedUser,
    changeTodaysMood,
}) => {
    const { first_name } = { ...fetchedUser };
    const routeNavigator = useRouteNavigator();
    return (
        <Group
            header={
                <Header size="s" className={styles.header}>
                    {first_name}, ты уже указал свое настроение сегодня
                </Header>
            }
        >
            <Div>
                <Button
                    stretched
                    size="l"
                    mode="primary"
                    onClick={() => {
                        routeNavigator.push("history");
                    }}
                >
                    Посмотреть историю настроения
                </Button>
            </Div>
            <Div>
                <Button
                    stretched
                    size="l"
                    mode="primary"
                    onClick={changeTodaysMood}
                >
                    Поменять сегодняшнее настроение
                </Button>
            </Div>
        </Group>
    );
};
