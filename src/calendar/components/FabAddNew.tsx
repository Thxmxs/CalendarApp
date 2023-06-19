import { addHours } from 'date-fns';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore';
//import { useAppDispatch } from '../../store/store';
import './styles/FabAddNew.css';

export const FabAddNew = () => {

    //const dispatch = useAppDispatch();
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleNewClick = () =>{
        setActiveEvent({
                title: "",
                note: "",
                start: new Date(),
                end: addHours(new Date(), 2),
                bgColor: "#fafafa",
                user:{
                    _id:'123',
                    name:'thomas'
                }
            });
        openDateModal();
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={handleNewClick}
    >
        <i className='fas fa-plus'></i>
    </button>
  )
}
