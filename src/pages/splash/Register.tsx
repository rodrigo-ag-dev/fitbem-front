import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen } from '../../components/Screen'
import { FormScreen } from '../../components/FormScreen'
import { Container } from '../../components/Container'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Button } from '../../components/Button'
import { useMessage } from '../../context/MessageContext'
import { API_BASE, fetchWithTimeout } from '../../lib/api'

const genderOptions = [
  { value: '0', text: 'Masculino' },
  { value: '1', text: 'Feminino' },
]

const initialForm = {
  name: '',
  lastname: '',
  phone: '',
  gender: '0',
  weight: '',
  height: '',
  email: '',
  pass1: '',
  pass2: '',
}

export const Register = () => {
  const navigate = useNavigate()
  const showMessage = useMessage()
  const nameRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const update = (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const handleSubmit = async () => {
    if (form.pass1 !== form.pass2) {
      showMessage('As senhas estão diferentes!', 'error')
      return
    }

    try {
      const resp = await fetchWithTimeout(`${API_BASE}user`, {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          lastname: form.lastname,
          phone: form.phone,
          gender: form.gender,
          weight: form.weight,
          height: form.height,
          email: form.email,
          password: form.pass1,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })

      if (resp && resp.status === 200) {
        setForm(initialForm)
        navigate('/login')
      } else {
        showMessage('Ocorreu um erro ao cadastrar esse usuário, tente novamente mais tarde!', 'error')
      }
    } catch (e) {
      showMessage(String(e), 'error')
    }
  }

  return (
    <Screen
      rightClassName="cadastro"
      formSide="left"
      form={
        <FormScreen title="Crie sua conta">
          <Container>
            <Input
              ref={nameRef}
              className="containerChildren margin-bottom-minimal"
              placeholder="Nome"
              value={form.name}
              onChange={update('name')}
            />
            <Input
              className="containerChildren margin-bottom-minimal"
              placeholder="Sobrenome"
              value={form.lastname}
              onChange={update('lastname')}
            />
          </Container>
          <Container>
            <Input
              className="containerChildren margin-bottom-minimal"
              placeholder="Telefone"
              value={form.phone}
              onChange={update('phone')}
            />
            <Select
              className="containerChildren comboField"
              options={genderOptions}
              value={form.gender}
              onChange={(gender) => setForm((prev) => ({ ...prev, gender }))}
            />
          </Container>
          <Container>
            <Input
              className="containerChildren margin-bottom-minimal"
              placeholder="Peso"
              value={form.weight}
              onChange={update('weight')}
            />
            <Input
              className="containerChildren margin-bottom-minimal"
              placeholder="Altura"
              value={form.height}
              onChange={update('height')}
            />
          </Container>
          <Input type="email" className="margin-bottom-minimal" placeholder="E-mail" value={form.email} onChange={update('email')} />
          <Input
            type="password"
            className="margin-bottom-minimal"
            placeholder="Senha"
            value={form.pass1}
            onChange={update('pass1')}
          />
          <Input
            type="password"
            className="margin-bottom-minimal"
            placeholder="Repita a senha"
            value={form.pass2}
            onChange={update('pass2')}
          />
          <Button caption="Cadastrar" className="formButton" onClick={handleSubmit} />
        </FormScreen>
      }
    />
  )
}
