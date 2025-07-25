import { FC, useState } from "react";
import {
    Header,
    Button,
    Group,
    Div,
    FormItem,
    Textarea,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Mood } from "../../../types";
import { useSendMood } from "../../../hooks/useSendMood";
import { useGetMoodHistory } from "../../../hooks/useGetMoodHistory";
import { EmojiRadioGroup } from "../EmojiRadioGroup/EmojiRadioGroup";
import styles from "./SelectMoodForm.module.css";

export interface SelectMoodFormProps {
    fetchedUser?: UserInfo;
}

export const SelectMoodForm: FC<SelectMoodFormProps> = ({ fetchedUser }) => {
    const { first_name } = { ...fetchedUser };
    const routeNavigator = useRouteNavigator();
    const [userMood, setUserMood] = useState<Mood | null>(null);
    const [note, setNote] = useState<string | null>(null);
    const sendMood = useSendMood();
    const { history } = useGetMoodHistory();
    return (
        <Group
            header={
                <Header size="s" className={styles.header}>
                    Привет, {first_name}! Какой вайб у тебя сегодня?
                </Header>
            }
        >
            <EmojiRadioGroup
                name="mood"
                value={userMood!}
                onChange={setUserMood}
            />
            <FormItem top="Хотите добавить заметку?">
                <Textarea
                    placeholder="Можешь написать пару слов о том, как прошел твой день"
                    value={note ?? undefined}
                    onChange={(e) => setNote(e.target.value)}
                    maxLength={100}
                />
            </FormItem>
            <Div>
                <Button
                    stretched
                    size="l"
                    mode="primary"
                    disabled={!userMood}
                    onClick={() => {
                        sendMood({
                            mood: userMood!,
                            note,
                            history: history || [],
                        });
                        routeNavigator.push("history");
                    }}
                >
                    Отправить!
                </Button>
            </Div>
        </Group>
    );
};
