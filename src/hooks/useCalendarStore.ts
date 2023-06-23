import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { IEvent, IEventCreationResp, IEvents } from '../calendar/interface/IEvents';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import calendarAPI from '../api/calendarAPI';
import { AxiosResponse } from 'axios';
import { ParseEvents } from '../helpers/ParseEvents';
import Swal from 'sweetalert2';


export const useCalendarStore = () => {
    const dispatch = useAppDispatch();
    const {events,activeEvent} = useSelector((state:RootState) => state.calendar)
    const {user} = useSelector((state : RootState) =>state.auth);

    const setActiveEvent = (calendarEvent :IEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(calendarEvent :IEvent) =>{

        if(calendarEvent._id && user){
            try {
                await calendarAPI.put(`/events/${calendarEvent._id}`,{...calendarEvent})
    
                //* Actualizando
                dispatch(onUpdateEvent({...calendarEvent,user:user}));
            } catch (error:any) {
                console.log(error)
                Swal.fire('Error al guardar',error.response.data.msg,'error');
            }

        }else{
            try {
                 //* Creando
                const  {data} : AxiosResponse<IEventCreationResp> = await calendarAPI.post('/events',{title:calendarEvent.title,notes:calendarEvent.notes,start:calendarEvent.start,end:calendarEvent.end,});
                console.log(data);
                if(user){
                    dispatch(onAddNewEvent({...calendarEvent,_id:data.eventSaved._id,user:user}));
                }
            } catch (error) {
                console.log(error)
            }
           
        }
    }

    const startDeletingEvent = async() =>{

        try {
            await calendarAPI.delete(`/events/${activeEvent?._id}`);
            dispatch(onDeleteEvent());
            Swal.fire('Accion realizada','Evento eliminado exitosamente','success');
        } catch (error:any) {
            console.log(error);
            Swal.fire('Error al guardar',error.response.data.msg,'error');
        }
    }

    const startLoadingEvents = async() =>{

        try {
            
            const {data} : AxiosResponse<IEvents> = await calendarAPI.get('/events');
            const eventsCleaned = ParseEvents(data.events);
            dispatch(onLoadEvents(eventsCleaned));
        } catch (error) {
            console.log(error);
        }

    }

    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* acciones
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
