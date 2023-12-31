import { useMemo, useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { IEventCreation } from "../interface/IEvents";
import { addHours, differenceInSeconds } from "date-fns";
import DatePicker, {registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import './styles/modal.css'
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
registerLocale('es',es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {

  const {isDateModalOpen,closeDateModal} = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<IEventCreation>({
    title:'Thomas',
    notes:'Cubillos',
    start:new Date(),
    end:addHours(new Date(),2)
  })

  const titleClass = useMemo(() => {
    if(!formSubmitted) return '';

    return (formValues.title.length > 0)
            ? ''
            : 'is-invalid'

  }, [formValues.title, formSubmitted])

  useEffect(() => {
    if(activeEvent !== null){
      setFormValues({...activeEvent});
    }
  }, [activeEvent])
  
  
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
      e.preventDefault();
      setFormValues({...formValues,[e.target.name]:e.target.value})
    }
    
  const onDateChanged = (event :Date | null, changing:string) =>{
    setFormValues({...formValues,[changing]:event});
  }

  const onHandleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if(isNaN(difference) || difference<=0){
        Swal.fire('Fechas incorrectas','Las fechas ingresadas son invalidas o la fecha de fin es menor o igual a la fecha de inicio','error');
        return;
    }

    if(formValues.title.length <=0) return;
    await startSavingEvent({...formValues,bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Thomas Cubillos",
      }});

      closeDateModal();
      setFormSubmitted(false);
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={ closeDateModal}
      style={customStyles}
      contentLabel="Example Modal"
      className={"modal"}
      overlayClassName={"modal-fondo"}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form onSubmit={onHandleSubmit} className="container">
        <div className="form-group mb-2">
          <label className="form-label d-block">Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className="form-control"
            onChange={(event) => onDateChanged(event,'start')}
            dateFormat={'Pp'}
            showTimeSelect
            locale={'es'}
          />
        </div>

        <div className="form-group mb-2">
          <label className="d-block">Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            onChange={(event) => onDateChanged(event,'end')}
            dateFormat={'Pp'}
            showTimeSelect
            locale={'es'}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            itemType="text"
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span>Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
