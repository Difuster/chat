import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Card, Container, Row, Col, Alert,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/authHook.jsx';
import useToast from '../hooks/toastHook.jsx';
import routes from '../routes';
import signUpPic from '../imgs/sign_up_pic.png';

function SignUpPage() {
  const [regFailed, setRegFailed] = useState(false);
  const toast = useToast();
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'signupPage' });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const schema = yup.object({
    username: yup.string()
      .required(t('errors.required field'))
      .min(3, t('errors.username must be at least 3 characters'))
      .max(20, t('errors.username must be max 20 characters')),
    password: yup.string()
      .required(t('errors.required field'))
      .min(6, t('errors.min pass characters')),
    passConfirmation: yup.string()
      .oneOf([yup.ref('password')], t('errors.oneOf')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passConfirmation: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.signUpPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        setRegFailed(false);
        auth.logIn();
        navigate('/');
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          toast.notify(t('errors.network error'));
        }
        if (error.isAxiosError && error.response.status === 409) {
          setRegFailed(true);
          inputRef.current.select();
          return;
        }
        throw error;
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col xs md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="p-5">

                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <img src={signUpPic} alt={t('registration')} />
                </Col>

                <Col>
                  <Card.Title className="text-center mb-5">
                    <h1>{t('registration')}</h1>
                  </Card.Title>
                  <Form onSubmit={formik.handleSubmit} className="form-floating">
                    {
                      regFailed
                        ? <Alert variant="danger">{t('errors.user is exists')}</Alert>
                        : null
                    }
                    <Form.Group controlId="username" className="form-floating mb-3">
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        placeholder={t('name')}
                        name="username"
                        id="username"
                        autoComplete="off"
                        isInvalid={regFailed}
                        required
                        ref={inputRef}
                      />
                      <Form.Label>{t('name')}</Form.Label>
                      {
                        formik.errors.username && formik.touched.username
                          ? (
                            <Form.Control.Feedback
                              type="invalid"
                              style={
                                { display: 'block' }
                              }
                            >
                              {formik.errors.username}
                            </Form.Control.Feedback>
                          )
                          : null
                      }
                    </Form.Group>
                    <Form.Group controlId="password" className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder={t('pass')}
                        name="password"
                        id="password"
                        autoComplete="off"
                        isInvalid={regFailed}
                        required
                      />
                      <Form.Label>{t('pass')}</Form.Label>
                      {
                        formik.errors.password && formik.touched.password
                          ? (
                            <Form.Control.Feedback
                              type="invalid"
                              style={
                                { display: 'block' }
                              }
                            >
                              {formik.errors.password}
                            </Form.Control.Feedback>
                          )
                          : null
                      }
                    </Form.Group>
                    <Form.Group controlId="passConfirmation" className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.passConfirmation}
                        placeholder={t('confirm pass')}
                        name="passConfirmation"
                        id="passConfirmation"
                        autoComplete="off"
                        isInvalid={regFailed}
                        required
                      />
                      <Form.Label>{t('confirm pass')}</Form.Label>
                      {
                        formik.errors.passConfirmation && formik.touched.passConfirmation
                          ? (
                            <Form.Control.Feedback
                              type="invalid"
                              style={
                                { display: 'block' }
                              }
                            >
                              {formik.errors.passConfirmation}
                            </Form.Control.Feedback>
                          )
                          : null
                      }
                    </Form.Group>
                    <Button type="submit" variant="outline-primary">{t('register')}</Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
