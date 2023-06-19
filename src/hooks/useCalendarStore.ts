import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { IEvent } from '../calendar/interface/IEvents';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';


export const useCalendarStore = () => {
    const dispatch = useAppDispatch();
    const {events,activeEvent} = useSelector((state:RootState) => state.calendar)

    const setActiveEvent = (calendarEvent :IEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(calendarEvent :IEvent) =>{

        // TODO: llegar al backend

        //todo: todo bien

        if(calendarEvent._id){
            //* Actualizando
            dispatch(onUpdateEvent(calendarEvent));
        }else{
            //* Creando
            dispatch(onAddNewEvent({...calendarEvent,_id: new Date().getTime().toString()}));
        }
    }

    const startDeletingEvent = () =>{
        dispatch(onDeleteEvent());
    }

    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* acciones
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}
