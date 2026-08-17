import { useState, type CSSProperties, type FormEvent } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useAddWeightEntry } from '../../lib/hooks'
import { Select } from '../../components/Select'

const sexoOptions = [
  { value: 0, text: 'Selecione' },
  { value: 1, text: 'Feminino' },
  { value: 2, text: 'Masculino' },
]

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
  const { addWeight, saving } = useAddWeightEntry()
  const [weightInput, setWeightInput] = useState(user ? String(user.weight) : '')
  const [heightInput, setHeightInput] = useState(user ? String(user.height) : '')

  if (!user) return null

  const handleSaveVitals = async (event: FormEvent) => {
    event.preventDefault()
    const weight = Number(weightInput.replace(',', '.'))
    const height = Number(heightInput.replace(',', '.'))
    if (!weight || !height) return
    await addWeight(weight, height)
  }

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
        <form className="linha vitalsForm" onSubmit={handleSaveVitals}>
          <div className="campo">
            <label className="label">Peso (kg):</label>
            <input
              className="inputPeso"
              type="number"
              inputMode="decimal"
              step="0.1"
              min="1"
              style={{ width: 100 }}
              value={weightInput}
              onChange={(event) => setWeightInput(event.target.value)}
            />
          </div>
          <div className="campo">
            <label className="label">Altura (cm):</label>
            <input
              className="inputAltura"
              type="number"
              inputMode="decimal"
              step="1"
              min="1"
              style={{ width: 100 }}
              value={heightInput}
              onChange={(event) => setHeightInput(event.target.value)}
            />
          </div>
          <div className="campo">
            <label className="label">Sexo:</label>
            <Select options={sexoOptions} defaultValue="0" />
          </div>
          <Field label="Data de Nascimento:" className="inputDataNascimento" style={{ width: 150 }} />
          <button type="submit" className="histAddSubmit vitalsSubmit" disabled={saving}>
            {saving ? 'Salvando…' : 'Salvar peso'}
          </button>
        </form>
      </div>
    </div>
  )
}
