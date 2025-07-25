import { FC, useState } from "react";
import { Panel, PanelHeader, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useGetMoodHistory } from "../../hooks/useGetMoodHistory";
import { getTodaysDateString } from "../../utils/getTodaysDateString";
import { SelectMoodForm } from "../ui/SelectMoodForm/SelectMoodForm";
import { AlreadySelectedMoodPage } from "../ui/AlreadySelectedMoodPage/AlreadySelectedMoodPage";
export interface HomeProps extends NavIdProps {
    fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id, fetchedUser }) => {
    const { history } = useGetMoodHistory();
    const [canChangeTodaysMood, setCanChangeTodaysMood] =
        useState<boolean>(false);
    const isTodaysMoodAlreadySelected = !history?.some(
        (item) => item.date === getTodaysDateString()
    );
    return (
        <Panel id={id}>
            <PanelHeader>Главная</PanelHeader>
            {isTodaysMoodAlreadySelected || canChangeTodaysMood ? (
                <SelectMoodForm fetchedUser={fetchedUser} />
            ) : (
                <AlreadySelectedMoodPage
                    fetchedUser={fetchedUser}
                    changeTodaysMood={() => setCanChangeTodaysMood(true)}
                />
            )}
        </Panel>
    );
};
