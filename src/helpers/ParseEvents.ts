import { parseISO } from "date-fns";
import { IEvent, IEvents } from "../calendar/interface/IEvents";

export const ParseEvents = (events:IEvent[]) => {
    return events.map(event =>{

        event.start = parseISO(event.start.toString());
        event.end = parseISO(event.end.toString());

        return event;
    })
}
