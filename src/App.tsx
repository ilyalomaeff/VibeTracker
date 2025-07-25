import { useState, useEffect, ReactNode } from "react";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { View, SplitLayout, SplitCol, ScreenSpinner } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { History, Home } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";

export const App = () => {
    const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
        useActiveVkuiLocation();
    const [fetchedUser, setUser] = useState<UserInfo | undefined>();
    const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner />);

    useEffect(() => {
        async function fetchData() {
            const user = await bridge.send("VKWebAppGetUserInfo");
            setUser(user);
            setPopout(null);
        }
        fetchData();
    }, []);

    return (
        <SplitLayout>
            <SplitCol>
                <View activePanel={activePanel}>
                    <Home id="home" fetchedUser={fetchedUser} />
                    <History id="history" fetchedUser={fetchedUser} />
                </View>
            </SplitCol>
            {popout}
        </SplitLayout>
    );
};
