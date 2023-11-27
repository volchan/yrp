import { z } from 'zod'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { FieldApi, useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'

import loginMutation from '../mutations/login.mutation'
import { useAuth } from '../provider/auth.provider'

function FieldInfo({ field }: { field: FieldApi<any, any, unknown, unknown> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? <em>{field.state.meta.touchedErrors}</em> : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

const LoginForm = () => {
  const [loginError, setLoginError] = useState<string | null>(null)
  const { setAccessToken, setRefreshToken } = useAuth()

  const location = useLocation()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: loginMutation,
    onSuccess: data => {
      setAccessToken(data.accessToken)
      setRefreshToken(data.refreshToken)
      return navigate(location.state?.from?.pathname ?? '/')
    },
    onError: _error => {
      setLoginError('Wrong email or password')
    },
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      mutation.mutate(values)
    },
    validator: zodValidator,
  })

  return (
    <>
      {mutation.isError ? <p>{loginError}</p> : null}
      <form.Provider>
        <form
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <div>
            <form.Field
              name="email"
              onChange={z.string().email('Invalid email')}
              children={field => {
                return (
                  <>
                    <label htmlFor={field.name}>Email</label>
                    <input
                      id={field.name}
                      name={field.name}
                      autoComplete="email"
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )
              }}
            />
          </div>
          <div>
            <form.Field
              name="password"
              onChange={z
                .string()
                .regex(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!\-%*?&])[A-Za-z\d@$!\-%*?&]{8,}$/,
                  'Password must have at least 8 characters, one lowercase letter, one uppercase letter, one digit, and one symbol',
                )}
              children={field => {
                return (
                  <>
                    <label htmlFor={field.name}>Password</label>
                    <input
                      id={field.name}
                      name={field.name}
                      autoComplete="current-password"
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )
              }}
            />
          </div>
          <form.Subscribe
            selector={state => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting, emptyRequiredFields]) => (
              <button type="submit" disabled={!canSubmit && emptyRequiredFields} style={{ marginTop: '1rem' }}>
                {isSubmitting ? '...' : 'Submit'}
              </button>
            )}
          />
        </form>
      </form.Provider>
    </>
  )
}

export default LoginForm
