import type { CSSProperties } from 'react'
import { useAuth } from '../../context/AuthContext'

interface FieldProps {
  label: string
  className: string
  placeholder?: string
  style?: CSSProperties
}

const Field = ({ label, className, placeholder, style }: FieldProps) => (
  <div className="campo">
    <label className="label">{label}</label>
    <input className={className} placeholder={placeholder} style={style} />
  </div>
)

export const Person = () => {
  const { user } = useAuth()
  if (!user) return null

  return (
    <div className="appCenter" style={{ justifyContent: 'unset', flex: 0.98, flexDirection: 'row', flexWrap: 'wrap' }}>
      <div className="headerPerson">
        <div className="headerPersonMain">
          <h1>Meus Dados</h1>
          <div className="userInfo">
            <span>&#x25bc;</span>
            <h2>{user.name}</h2>
            <img className="imgUser" alt="" />
          </div>
        </div>
      </div>
      <div className="personMain" style={{ justifyContent: 'unset', flex: 0.98 }}>
        <div className="foto">
          <span className="camera" />
        </div>
        <span className="editIcon" />

        <div className="linha">
          <Field label="Nome:" className="inputNome" placeholder={user.name} />
          <Field label="Sobrenome:" className="inputNome" />
        </div>
        <div className="linha" style={{ marginBottom: 30 }}>
          <Field label="E-mail:" className="inputEmail" placeholder={user.email} />
          <Field label="Telefone:" className="inputTelefone" />
        </div>
        <div className="linha">
          <Field label="Logradouro:" className="inputLogradouro" />
          <Field label="Número:" className="inputNumero" style={{ width: 100 }} />
          <Field label="Cep:" className="inputCep" style={{ width: 100 }} />
        </div>
        <div className="linha" style={{ marginBottom: 30 }}>
          <Field label="Bairro:" className="inputBairro" style={{ width: 200 }} />
          <Field label="Cidade:" className="inputCidade" style={{ width: 200 }} />
          <Field label="Estado:" className="inputEstado" style={{ width: 100 }} />
        </div>
        <div className="linha">
          <Field label="Peso:" className="inputPeso" placeholder={String(user.weight)} style={{ width: 100 }} />
          <Field label="Altura:" className="inputAltura" placeholder={String(user.height)} style={{ width: 100 }} />
          <div className="campo">
            <label className="label">Sexo:</label>
            <select className="selectSexo">
              <option value={0}>Selecione</option>
              <option value={1}>Feminino</option>
              <option value={2}>Masculino</option>
            </select>
          </div>
          <Field label="Data de Nascimento:" className="inputDataNascimento" style={{ width: 150 }} />
        </div>
      </div>
    </div>
  )
}
