import { createContext, useContext, useState } from "react";

export const EventContext = createContext();

export function EventContextProvider(props) {
    const [event, setEvent] = useState({});
    const valor = {event, setEvent};
    return (
        <EventContext.Provider value={valor}>
            {props.children}
        </EventContext.Provider>
    )
}

export function useEventContext() {
    const context = useContext(EventContext);

    if (!context) {
        throw new Error('bad context use');
    }
    return context;
}
