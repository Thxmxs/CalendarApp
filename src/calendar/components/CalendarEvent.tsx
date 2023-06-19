import { EventProps } from "react-big-calendar";
import { IEvent } from "../interface/IEvents";


export const CalendarEvent  = ({event} : EventProps<IEvent>) => {

    const {title,user} = event;

  return (
    <>
        <strong>{title}</strong>
        <span> - {user.name}</span>
    </>
  )
}
