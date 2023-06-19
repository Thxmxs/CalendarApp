import { Calendar, EventPropGetter, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Navbar } from "../components/Navbar";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesES } from "../../helpers/getCalendarMessages";
import { CalendarEvent } from "../components/CalendarEvent";
import { IEvent } from "../interface/IEvents";
import { useState } from "react";
import { CalendarModal } from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";

export const CalendarPage = () => {
  const { events, setActiveEvent } = useCalendarStore();
  const {openDateModal} = useUiStore();
  const [lastView, setLastView] = useState<View>(localStorage.getItem('lastView') as View || 'week');

  const eventStyleGetter: EventPropGetter<IEvent> = () => {

    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opactiy: 0.8,
      color: "white",
    };
    return { style };
  };

  const onDoubleClick = (events:IEvent,e:React.SyntheticEvent<HTMLElement, Event>) =>{
    e.preventDefault();
    openDateModal();
    console.log({doubleClick:events});
  }
  
  const onSelect = (events:IEvent) =>{
    console.log({onSelect:events});
    setActiveEvent(events);
  }
  
  const onViewChanged = (view:View) =>{
    localStorage.setItem('lastView',view);
    setLastView(view);
  }

  return (
    <div>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </div>
  );
};
