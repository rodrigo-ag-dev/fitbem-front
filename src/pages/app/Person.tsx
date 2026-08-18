import { useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react'
import { useAuth } from '../../context/AuthContext'
import { API_BASE } from '../../lib/api'
import { useAddWeightEntry, useUpdateProfile, useUploadPhoto } from '../../lib/hooks'
import { Select } from '../../components/Select'

const sexoOptions = [
  { value: '', text: 'Selecione' },
  { value: '0', text: 'Masculino' },
  { value: '1', text: 'Feminino' },
]

interface FieldProps {
  label: string
  className: string
  placeholder?: string
  style?: CSSProperties
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  title?: string
}

const Field = ({ label, className, placeholder, style, value, onChange, disabled, title }: FieldProps) => (
  <div className="campo">
    <label className="label">{label}</label>
    <input
      className={className}
      placeholder={placeholder}
      style={style}
      value={value}
      onChange={onChange}
      disabled={disabled}
      title={title}
    />
  </div>
)

export const Person = () => {
  const { user } = useAuth()
  const { addWeight, saving } = useAddWeightEntry()
  const { saveProfile, saving: savingProfile } = useUpdateProfile()
  const { uploadPhoto, uploading } = useUploadPhoto()
  const [weightInput, setWeightInput] = useState(user ? String(user.weight) : '')
  const [heightInput, setHeightInput] = useState(user ? String(user.height) : '')
  const [nameInput, setNameInput] = useState(user?.name ?? '')
  const [lastnameInput, setLastnameInput] = useState(user?.lastname ?? '')
  const [phoneInput, setPhoneInput] = useState(user?.phone ?? '')
  const [genderInput, setGenderInput] = useState(user?.gender ?? '')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [photoMissing, setPhotoMissing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!user) return null

  const addressPlaceholder = 'Em breve'

  const handleSaveVitals = async (event: FormEvent) => {
    event.preventDefault()
    const weight = Number(weightInput.replace(',', '.'))
    const height = Number(heightInput.replace(',', '.'))
    if (!weight || !height) return
    await addWeight(weight, height)
  }

  const handleSaveProfile = async (event: FormEvent) => {
    event.preventDefault()
    await saveProfile({ name: nameInput, lastname: lastnameInput, phone: phoneInput, gender: genderInput })
  }

  const handlePickPhoto = () => fileInputRef.current?.click()

  const handlePhotoSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setPreviewUrl(URL.createObjectURL(file))
    setPhotoMissing(false)
    await uploadPhoto(file)
  }

  const photoUrl = previewUrl ?? `${API_BASE}user/${user.userId}/photo`

  return (
    <div className="appCenter">
      <div className="headerPerson">
        <div className="headerPersonMain">
          <h1>Meus Dados</h1>
        </div>
      </div>
      <div className="personMain">
        <div className="foto">
          {!photoMissing && (
            <img
              src={photoUrl}
              alt=""
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              onError={() => setPhotoMissing(true)}
            />
          )}
          <span className="camera" onClick={handlePickPhoto} title={uploading ? 'Enviando…' : 'Trocar foto'} />
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoSelected} />
        </div>
        <span className="editIcon" />

        <form onSubmit={handleSaveProfile}>
          <div className="linha">
            <Field label="Nome:" className="inputNome" value={nameInput} onChange={(event) => setNameInput(event.target.value)} />
            <Field
              label="Sobrenome:"
              className="inputNome"
              value={lastnameInput}
              onChange={(event) => setLastnameInput(event.target.value)}
            />
          </div>
          <div className="linha" style={{ marginBottom: 30, alignItems: 'flex-end' }}>
            <Field label="E-mail:" className="inputEmail" value={user.email} disabled title="O e-mail não pode ser alterado" />
            <Field
              label="Telefone:"
              className="inputTelefone"
              value={phoneInput}
              onChange={(event) => setPhoneInput(event.target.value)}
            />
            <div className="campo">
              <label className="label">Sexo:</label>
              <Select options={sexoOptions} value={genderInput} onChange={setGenderInput} />
            </div>
            <button type="submit" className="histAddSubmit" disabled={savingProfile}>
              {savingProfile ? 'Salvando…' : 'Salvar dados'}
            </button>
          </div>
        </form>
        <div className="linha">
          <Field label="Logradouro:" className="inputLogradouro" placeholder={addressPlaceholder} disabled title="Em breve" />
          <Field
            label="Número:"
            className="inputNumero"
            style={{ width: 100 }}
            placeholder={addressPlaceholder}
            disabled
            title="Em breve"
          />
          <Field label="Cep:" className="inputCep" style={{ width: 100 }} placeholder={addressPlaceholder} disabled title="Em breve" />
        </div>
        <div className="linha" style={{ marginBottom: 30 }}>
          <Field
            label="Bairro:"
            className="inputBairro"
            style={{ width: 200 }}
            placeholder={addressPlaceholder}
            disabled
            title="Em breve"
          />
          <Field
            label="Cidade:"
            className="inputCidade"
            style={{ width: 200 }}
            placeholder={addressPlaceholder}
            disabled
            title="Em breve"
          />
          <Field
            label="Estado:"
            className="inputEstado"
            style={{ width: 100 }}
            placeholder={addressPlaceholder}
            disabled
            title="Em breve"
          />
          <Field
            label="Data de Nascimento:"
            className="inputDataNascimento"
            style={{ width: 150 }}
            placeholder={addressPlaceholder}
            disabled
            title="Em breve"
          />
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
          <button type="submit" className="histAddSubmit vitalsSubmit" disabled={saving}>
            {saving ? 'Salvando…' : 'Salvar peso'}
          </button>
        </form>
      </div>
    </div>
  )
}
