import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IEvent } from '../../calendar/interface/IEvents';




interface IinitialState{
    isLoadingEvents:boolean,
    events:IEvent[],
    activeEvent:null | IEvent
}

const initialState :IinitialState = {
    isLoadingEvents:true,
    events:[],
    activeEvent:null
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: initialState,
    reducers: { 
        onSetActiveEvent:(state,{payload}:PayloadAction<IEvent>)=>{
            state.activeEvent = payload;
        },
        onAddNewEvent:(state,{payload}:PayloadAction<IEvent>) =>{
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent:(state,{payload}:PayloadAction<IEvent>) =>{
            state.events = state.events.map(event =>{

                if(event._id === payload._id){
                    return payload;
                }

                return event;
            })
        },
        onDeleteEvent:(state) =>{

            if(state.activeEvent){
                state.events = state.events.filter(event => event._id !== state.activeEvent?._id);
                state.activeEvent = null;
            }

        },
        onLoadEvents:(state, {payload} : PayloadAction<IEvent[]>) =>{
            state.isLoadingEvents=false;
            // state.events = payload;
            payload.forEach(event =>{
                const exists = state.events.some( dbEvent => dbEvent._id === event._id);
                if(!exists){
                    state.events.push(event)
                }
            })
        },
        onLogoutCalendar:( state ) =>{
            state.isLoadingEvents = true,
            state.events=[]
            state.activeEvent = null;
        }
     },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents,onLogoutCalendar } = calendarSlice.actions;