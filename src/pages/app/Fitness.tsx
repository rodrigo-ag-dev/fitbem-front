import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useProfessionals, useSelectOptions } from '../../lib/hooks'
import { ProfessionalCard } from '../../components/ProfessionalCard'
import { Spinner } from '../../components/Spinner'
import { Select } from '../../components/Select'
import type { Option } from '../../types'

const textForValue = (options: Option[], value: string) => {
  const option = options.find((item) => String(item.value) === value)
  return option ? option.text : ''
}

export const Fitness = () => {
  const { user } = useAuth()
  const kindServices = useSelectOptions('kindservice', (item) => ({
    value: item.id ?? '',
    text: item.description ?? '',
  }))
  const cities = useSelectOptions('city', (item) => ({ value: item.id ?? '', text: item.description ?? '' }))
  const states = useSelectOptions('state', (item) => ({ value: item.state ?? '', text: item.state ?? '' }))
  const { data, loading } = useProfessionals('trainer')

  const [search, setSearch] = useState('')
  const [kindServiceFilter, setKindServiceFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [stateFilter, setStateFilter] = useState('')

  const kindServiceOptions = [{ value: -1, text: 'Tipo de serviço' }, ...kindServices]
  const cityOptions = [{ value: 0, text: 'Cidade' }, ...cities]
  const stateOptions = [{ value: 'Estado', text: 'Estado' }, ...states]

  if (!user) return null

  const query = search.trim().toLowerCase()
  const filteredData = data.filter((professional) => {
    const searchMatch =
      !query ||
      professional.description.toLowerCase().includes(query) ||
      professional.specialty.toLowerCase().includes(query) ||
      professional.category.toLowerCase().includes(query) ||
      professional.city.toLowerCase().includes(query)
    const kindServiceMatch =
      !kindServiceFilter ||
      professional.specialty.toLowerCase().includes(kindServiceFilter.toLowerCase()) ||
      professional.category.toLowerCase().includes(kindServiceFilter.toLowerCase())
    const cityMatch = !cityFilter || professional.city.toLowerCase().includes(cityFilter.toLowerCase())
    const stateMatch = !stateFilter || professional.city.toLowerCase().includes(stateFilter.toLowerCase())
    return searchMatch && kindServiceMatch && cityMatch && stateMatch
  })

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
            <input
              className="inputSearchFitness"
              placeholder="Pesquisar por..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type="button" className="buttonSearch">
              Buscar
            </button>
          </div>
          <Select
            className="selectPill"
            options={kindServiceOptions}
            defaultValue="-1"
            onChange={(value) => setKindServiceFilter(value === '-1' ? '' : textForValue(kindServiceOptions, value))}
          />
          <Select
            className="selectPill"
            options={cityOptions}
            defaultValue="0"
            onChange={(value) => setCityFilter(value === '0' ? '' : textForValue(cityOptions, value))}
          />
          <Select
            className="selectPill"
            options={stateOptions}
            defaultValue="Estado"
            onChange={(value) => setStateFilter(value === 'Estado' ? '' : textForValue(stateOptions, value))}
          />
        </div>
      </div>
      {loading && <Spinner />}
      {!loading &&
        filteredData.map((professional, index) => (
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
