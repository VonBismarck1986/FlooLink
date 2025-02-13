import { PlayerStore, usePlayerStore } from "@stores/PlayerStore"
import { URLStore, useURLStore } from "@stores/URLStore";
import { useEffect } from "preact/hooks";

import SVGPlayerMap from "@components/Map/SVGPlayerMap";

const selectConnectionOptions = (state : ReturnType<typeof URLStore["get"]>) : string => (
    state.query["url"] ?? process.env.NODE_ENV === "development" ? "ws://localhost:8081" : "wss://tangerie.xyz:8081"
)

export default function MapRoute() {
    const connectionURL = useURLStore(selectConnectionOptions);
    const status = usePlayerStore(state => state.status);

    useEffect(() => {
        PlayerStore.actions.connect(connectionURL);
        return () => PlayerStore.actions.disconnect();
    }, []);

    
    return <div class="h-screen w-screen bg-[#323232]">
        <SVGPlayerMap class="w-screen h-screen"/>
    </div>
}