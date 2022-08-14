import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

function Login() {
  const SignupSchema = yup.object().shape({
    name: yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: yup.string()
      .min(4, 'Too Short!')
      .required('Required'),
  });
  return (
    <div>
      <h1>Войти в чат</h1>
      <Formik
        initialValues={{
          name: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="name" />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}
            <Field name="password" />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}
            <button type="submit">Войти</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
