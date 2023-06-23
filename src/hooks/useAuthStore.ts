import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store"
import { ILogin, ILoginPostResp, IRefreshTokenResp, IRegister, IRegsiterPostResp } from "../interfaces/IAuth";
import calendarAPI from "../api/calendarAPI";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { AxiosResponse } from "axios";
import { onLogoutCalendar } from "../store/calendar/calendarSlice";

export const useAuthStore = () =>{

    const { status,user,errorMessage } = useSelector((state:RootState) => state.auth);
    const dispatch = useAppDispatch();

    const startLogin = async({email,password}:ILogin) =>{
        dispatch(onChecking());
        try {
            const resp :ILoginPostResp = (await calendarAPI.post('/auth',{email, password})).data;
            localStorage.setItem('token', resp.token);
            dispatch(onLogin({...resp}))
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage)
            }, 10);
        }
    };

    const startRegister = async({email,password,name}:IRegister) =>{
        dispatch(onChecking());
        try {
            const resp :IRegsiterPostResp = (await calendarAPI.post('/auth/new',{email, password,name})).data;
            localStorage.setItem('token', resp.token);
            dispatch(onLogin({name:resp.user.name,email:resp.user.email,_id:resp.user._id}));
        } catch (error:any) {
            dispatch(onLogout(error.response.data?.msg));
            setTimeout(() => {
                dispatch(clearErrorMessage)
            }, 10);
        }
    }

    const checkAuthToken = async() =>{
        const token = localStorage.getItem('token');

        if(!token) return dispatch(onLogout(undefined));

        try {
            const {data} : AxiosResponse<IRefreshTokenResp> = await calendarAPI.get('auth/refresh');
            localStorage.setItem('token', data.token);
            dispatch(onLogin({name:data.name,email:data.email,_id:data.uid}));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout(undefined))
        }
    }

    const startLogout = () =>{
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }

    return {
        //* Propiedades
        status,user,errorMessage,

        //* Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }

}