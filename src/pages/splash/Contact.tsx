import { useEffect, useRef } from 'react'
import { Screen } from '../../components/Screen'
import { FormScreen } from '../../components/FormScreen'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { Button } from '../../components/Button'

export const Contact = () => {
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  return (
    <Screen
      leftClassName="contato"
      formSide="right"
      form={
        <FormScreen title="Fale com a gente">
          <Input ref={nameRef} placeholder="Nome" className="margin-bottom-minimal" />
          <Input type="email" placeholder="E-mail" className="margin-bottom-minimal" />
          <Input placeholder="Telefone" className="margin-bottom-minimal" />
          <Textarea placeholder="Mensagem" className="margin-bottom-minimal" style={{ height: 170 }} />
          <Button caption="Enviar" className="formButton" />
        </FormScreen>
      }
    />
  )
}
