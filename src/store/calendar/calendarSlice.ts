import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IEvent } from '../../calendar/interface/IEvents';
import { addHours } from 'date-fns';

const tempEvent : IEvent[]= [{
          _id:'123',
          title: "cumpleaños",
          note: "hay que comprar doritos",
          start: new Date(),
          end: addHours(new Date(), 2),
          bgColor: "#fafafa",
          user: {
            _id: "123",
            name: "Thomas Cubillos",
          },
}]


interface IinitialState{
    events:IEvent[],
    activeEvent:null | IEvent
}

const initialState :IinitialState = {
    events:tempEvent,
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

        }
     },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;