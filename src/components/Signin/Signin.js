import React, { useEffect, useRef } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'

import styles from './Signin.module.css'

const Signin = () => {
    const refLoginErrorMessage = useRef(null)
    const user = {}
    const onChangeFormik = (formik) => (event) => {
        formik.handleChange(event);
        refLoginErrorMessage.current.style.display = 'none';
    }

    useEffect(() => {
        if (typeof user.signedin !== 'undefined') {
            refLoginErrorMessage.current.style.display = (!user.signedin) ? ('block') : ('none')
            //!!user.signedin && cbSignedIn()
        }
    }, [user])
    return (
        <Formik
            initialValues={{ username: 'unknown', password: 'unknown' }}
            validate={values => {
                const errors = {}
                if (!values.username) {
                    errors.username = 'Не введёно имя'
                }
                if (!values.password) {
                    errors.password = 'Не введён пароль'
                }
                return errors
            }}
            onSubmit={(values) => console.log({ ...values })}
        >
            {formik => (
                <div className={styles.signin}>
                    <div className={styles.signinplate}>
                        <Form autocomplete="off">
                            <Field name="username" type="text" autocomplete="off" placeholder="Введите здесь имя" onChange={onChangeFormik(formik)} />
                            <Field name="password" type="password" autocomplete="off" placeholder="Введите здесь пароль" onChange={onChangeFormik(formik)} />
                            <button type="submit">Войти</button>
                        </Form>
                        <a href="/restorepassword">Забыли пароль?</a>
                    </div>
                    <div className={styles.signinerrors}>
                        <div>
                            <ErrorMessage name="username" />
                        </div>
                        <div>
                            <ErrorMessage name="password" />
                        </div>
                        <div ref={refLoginErrorMessage} style={{display: 'none'}}>
                            Неверные имя или пароль
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    )
}

export default Signin
