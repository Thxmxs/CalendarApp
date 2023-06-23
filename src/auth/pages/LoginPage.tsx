import { useFormik } from 'formik';
import * as Yup from "yup";
import './LoginPage.css';
import { ILogin } from '../../interfaces/IAuth';
import { InputText } from '../../components/InputText';
import { ErrorLabel } from '../../components/ErrorLabel';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const LoginPage = () => {

    const {startLogin, errorMessage} = useAuthStore();

    const formik = useFormik<ILogin>({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema:Yup.object({
            email:Yup.string().required('El correo es requerido'),
            password:Yup.string().required('La contraseña es requerida')
        }),
        onSubmit(values){
            startLogin({...values})
        }
    })

    useEffect(() => {
        if(errorMessage !== undefined){
            Swal.fire('Error en la autenticacion',errorMessage,'error');
        }
    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1 mx-auto">
                    <h3>Ingreso</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group mb-2">
                            <InputText
                                name='email'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='Correo'
                                value={formik.values.email}
                            />
                            <ErrorLabel
                                errorString={formik.errors.email}
                                fieldName={'email'}
                                fieldTouched={formik.touched.email}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <InputText
                                name='password'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='Contraseña'
                                value={formik.values.password}
                                type='password'
                            />
                            <ErrorLabel
                                errorString={formik.errors.password}
                                fieldName={'password'}
                                fieldTouched={formik.touched.password}
                            />
                        </div>
                        <div className="form-group mb-2 w-100">
                            <input 
                                type="submit"
                                className="btnSubmit w-100 mt-3"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                
            </div>
        </div>
    )
}