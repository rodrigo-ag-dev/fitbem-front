import { useAuth } from '../../context/AuthContext'
import { useProfessionals, useSelectOptions } from '../../lib/hooks'
import { ProfessionalCard } from '../../components/ProfessionalCard'
import { Spinner } from '../../components/Spinner'

export const Fitness = () => {
  const { user } = useAuth()
  const kindServices = useSelectOptions('kindservice', (item) => ({
    value: item.id ?? '',
    text: item.description ?? '',
  }))
  const cities = useSelectOptions('city', (item) => ({ value: item.id ?? '', text: item.description ?? '' }))
  const states = useSelectOptions('state', (item) => ({ value: item.state ?? '', text: item.state ?? '' }))
  const { data, loading } = useProfessionals('trainer')

  if (!user) return null

  return (
    <div className="appCenter" style={{ justifyContent: 'unset', flex: 0.98, flexDirection: 'row', flexWrap: 'wrap' }}>
      <div className="headerFitness">
        <div className="headerFitnessMain">
          <h1>Preparadores Físicos</h1>
          <div className="userInfo">
            <span>&#x25bc;</span>
            <h2>{user.name}</h2>
            <img className="imgUser" alt="" />
          </div>
        </div>
        <div className="filterFitness">
          <div className="filterFitnessSearch">
            <span className="searchIconImg" />
            <input className="inputSearchFitness" placeholder="Pesquisar por..." />
            <button type="button" className="buttonSearch">
              Buscar
            </button>
          </div>
          <select className="selectTipoServico" defaultValue={-1}>
            <option value={-1}>Tipo de serviço</option>
            {kindServices.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <select className="selectCidade" defaultValue={0}>
            <option value={0}>Cidade</option>
            {cities.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <select className="selectEstado" defaultValue="Estado">
            <option value="Estado">Estado</option>
            {states.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading && <Spinner />}
      {!loading &&
        data.map((professional, index) => (
          <ProfessionalCard
            key={index}
            description={professional.description}
            city={professional.city}
            whatsapp={professional.whatsapp}
            specialty={professional.specialty}
            category={professional.category}
          />
        ))}
    </div>
  )
}
