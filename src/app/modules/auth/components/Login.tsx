/* eslint-disable jsx-a11y/anchor-is-valid */
import {useContext, useState} from 'react'
import * as Yup from 'yup'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {useAuth} from '../core/Auth'
import axios from 'axios'
import { AUTH_URL } from '../../../helpers/ApiEndpoints'
import { AppContext } from '../../../providers/AppProvider'

const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
})

const initialValues = {
  email: 'admin@email.com',
  password: '12345678',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState()
  const {saveAuth, setCurrentUser} = useAuth()
  const {setIdForTaskRunning} = useContext(AppContext)

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setLoading(true)
      await axios.post(`${AUTH_URL}/login`, values).then(async (response) => {
        if(response?.status===201){
          saveAuth({accessToken: response?.data?.accessToken})
          setCurrentUser({...response?.data?.user})
          setIdForTaskRunning(response?.data?.user?.runningTask?.id || 0)
        }
      }).catch((error) => {
        setHasError(error?.response?.data?.message)
        saveAuth(undefined)
      }).finally(() => {
        setSubmitting(false)
        setLoading(false)
      })
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
      </div>
      {/* begin::Heading */}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className='form-control bg-transparent'
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className='form-control bg-transparent'
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary'>
          Forgot Password ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}

      {hasError && <div className="alert alert-danger d-flex align-items-center p-5 mb-10">
        <div className="d-flex flex-column">
          <span>{hasError}</span>
        </div>
      </div>}

      {/* <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up
        </Link>
      </div> */}
    </form>
  )
}
