import { ErrorLabel } from '../../components/ErrorLabel';
import { InputText } from '../../components/InputText';
import { useAuthStore } from '../../hooks/useAuthStore';
import { IRegister } from '../../interfaces/IAuth';
import './LoginPage.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
export const RegisterPage = () => {

    const { startRegister, errorMessage } = useAuthStore();

    const formik = useFormik<IRegister>({
        initialValues:{
            name:'',
            email:'',
            password:'',
            passwordRepeated:''
        },
        validationSchema:Yup.object({
            name:Yup.string().required('La contraseña es requerida'),
            email:Yup.string().email('El correo es invalido').required('El correo es requerido'),
            password:Yup.string().required('La contraseña es requerida'),
            passwordRepeated:Yup.string()
                            .test('passwordRepeatedVal',
                            'Las contraseñas deben ser iguales',
                            function(value){
                                if(value !== formik.values.password){
                                    return false;
                                }
                                return true;
                            }),
        }),
        onSubmit(values){
            startRegister({...values});
        }
    });

    useEffect(() => {
        if(errorMessage !== undefined){
            Swal.fire('Error en la autenticacion',errorMessage,'error');
        }
    }, [errorMessage])

  return (
    <div className="container login-container">
        <div className="row">
            <div className="col-md-6 login-form-2 mx-auto">
                <h3>Registro</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-2">
                        <InputText
                            name='name'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder='Nombre'
                            value={formik.values.name}
                        />
                        <ErrorLabel
                            errorString={formik.errors.name}
                            fieldName='name'
                            fieldTouched={formik.touched.name}
                        />
                    </div>
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
                            fieldName='email'
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

                    <div className="form-group mb-2">
                        <InputText
                            name='passwordRepeated'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder='Repita la contraseña'
                            value={formik.values.passwordRepeated}
                            type='password'
                        />
                        <ErrorLabel
                            errorString={formik.errors.passwordRepeated}
                            fieldName={'passwordRepeated'}
                            fieldTouched={formik.touched.passwordRepeated}
                        />
                    </div>

                    <div className="form-group mb-2 w-100">
                        <input 
                            type="submit" 
                            className="btnSubmit w-100" 
                            value="Crear cuenta" />
                    </div>
                </form>
            </div> 
        </div> 
    </div> 

  )
}
