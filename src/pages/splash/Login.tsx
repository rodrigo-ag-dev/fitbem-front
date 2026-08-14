import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Screen } from '../../components/Screen'
import { FormScreen } from '../../components/FormScreen'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useAuth } from '../../context/AuthContext'
import { useMessage } from '../../context/MessageContext'
import mailIcon from '../../assets/images/mail.png'
import lockIcon from '../../assets/images/lock.png'

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const showMessage = useMessage()
  const emailRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.ok) navigate('/app')
    else showMessage(result.error ?? 'Erro ao autenticar', 'error')
  }

  return (
    <>
      {loading && <div className="loading" />}
      <Screen
        rightClassName="login"
        formSide="left"
        form={
          <FormScreen
            title="Login"
            texts={[
              'Informe seus dados de acesso',
              <>
                Não possui uma conta? <NavLink to="/cadastro">Cadastre-se</NavLink>
              </>,
            ]}
          >
            <Input
              ref={emailRef}
              type="email"
              icon={mailIcon}
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              icon={lockIcon}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="forget">Esqueceu a senha?</p>
            <Button caption="Entrar" className="formButton" onClick={handleSubmit} />
          </FormScreen>
        }
      />
    </>
  )
}
