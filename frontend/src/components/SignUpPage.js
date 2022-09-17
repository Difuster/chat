import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Card, Container, Row, Col
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import useToast from '../hooks/toastHook.jsx';
import routes from '../routes';
import signUpPic from '../imgs/sign_up_pic.png';

function SignUpPage() {
  const [err, setErr] = useState('');
  const [authFailed, setAuthFailed] = useState(false);
  const toast = useToast();
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'signupPage' });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validateForm = (data) => {
    yup.setLocale({
      mixed: {
        oneOf: t('errors.oneOf')
      },
      string: {
        required: t('errors.required'),
        min: t('errors.min name characters'),
        max: t('errors.max'),
      }
    });

    const schema = yup.object({
      username: yup.string().required().min(3).max(20),
      password: yup.string().required().min(6, t('errors.min pass characters')),
      passConfirmation: yup.string().oneOf([yup.ref('password')]),
    });

    return schema.validate(data);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passConfirmation: '',
    },
    onSubmit: (values) => {
      validateForm(values)
        .then(async (regData) => {
          setAuthFailed(false);
          try {
            const res = await axios.post(routes.signUpPath(), regData);
            localStorage.setItem('userId', JSON.stringify(res.data));
            setErr('');
            auth.logIn();
            navigate('/');
          } catch (error) {
            if (error.code === 'ERR_NETWORK') {
              toast.notify(t('network error'));
            }
            if (error.isAxiosError && error.response.status === 409) {
              setAuthFailed(true);
              inputRef.current.select();
              return;
            }
            setErr(error.message);
            throw error;
          }
        })
        .catch((error) => {
          setAuthFailed(true);
          setErr(error.message);
        });
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
                    <Form.Group controlId="username" className="form-floating mb-3">
                      <Form.Control
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        placeholder={t('name')}
                        name="username"
                        id="username"
                        autoComplete="username"
                        isInvalid={authFailed}
                        required
                        ref={inputRef}
                      />
                      <Form.Label>{t('name')}</Form.Label>
                    </Form.Group>
                    <Form.Group controlId="username" className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder={t('pass')}
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        isInvalid={authFailed}
                        required
                      />
                      <Form.Label>{t('pass')}</Form.Label>
                    </Form.Group>
                    <Form.Group controlId="username" className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.passConfirmation}
                        placeholder={t('confirm pass')}
                        name="passConfirmation"
                        id="passConfirmation"
                        autoComplete="current-password"
                        isInvalid={authFailed}
                        required
                      />
                      <Form.Label>{t('confirm pass')}</Form.Label>
                    </Form.Group>
                    {
                      err
                        ? <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>{err}</Form.Control.Feedback>
                        : <br />
                    }
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
