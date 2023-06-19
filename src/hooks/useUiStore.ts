import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice';

export const useUiStore = () => {
    const dispatch = useAppDispatch();
  
    const {isDateModalOpen} = useSelector( (state : RootState) => state.ui)

    const openDateModal = () =>{
        dispatch(onOpenDateModal());
    }

    const closeDateModal = () =>{
        dispatch(onCloseDateModal());
    }

    return {

        //* Propiedades
        isDateModalOpen,

        //* Metodos
        openDateModal,
        closeDateModal
    }

}
