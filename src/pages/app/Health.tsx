import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useProfessionals, useSelectOptions } from '../../lib/hooks'
import { ProfessionalCard } from '../../components/ProfessionalCard'
import { ProfessionalCardSkeleton } from '../../components/Skeleton'
import { Select } from '../../components/Select'
import type { Option } from '../../types'

const SKELETON_COUNT = 6

const textForValue = (options: Option[], value: string) => {
  const option = options.find((item) => String(item.value) === value)
  return option ? option.text : ''
}

export const Health = () => {
  const { user } = useAuth()
  const specialties = useSelectOptions('specialty', (item) => ({ value: item.id ?? '', text: item.description ?? '' }))
  const cities = useSelectOptions('city', (item) => ({ value: item.id ?? '', text: item.description ?? '' }))
  const states = useSelectOptions('state', (item) => ({ value: item.state ?? '', text: item.state ?? '' }))
  const { data, loading } = useProfessionals('health')

  const [search, setSearch] = useState('')
  const [specialtyFilter, setSpecialtyFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [stateFilter, setStateFilter] = useState('')

  const specialtyOptions = [{ value: -1, text: 'Especialidade' }, ...specialties]
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
    const specialtyMatch =
      !specialtyFilter ||
      professional.specialty.toLowerCase().includes(specialtyFilter.toLowerCase()) ||
      professional.category.toLowerCase().includes(specialtyFilter.toLowerCase())
    const cityMatch = !cityFilter || professional.city.toLowerCase().includes(cityFilter.toLowerCase())
    const stateMatch = !stateFilter || professional.city.toLowerCase().includes(stateFilter.toLowerCase())
    return searchMatch && specialtyMatch && cityMatch && stateMatch
  })

  return (
    <div className="appCenter">
      <div className="headerHealth">
        <div className="headerHealthMain">
          <h1>Profissionais da Saúde</h1>
        </div>
        <div className="filterHealth">
          <div className="filterHealthSearch">
            <span className="searchIconImg" />
            <input
              className="inputSearchHealth"
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
            options={specialtyOptions}
            defaultValue="-1"
            onChange={(value) => setSpecialtyFilter(value === '-1' ? '' : textForValue(specialtyOptions, value))}
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
      <div className="professionalResults">
        {loading &&
          Array.from({ length: SKELETON_COUNT }).map((_, index) => <ProfessionalCardSkeleton key={index} />)}
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
    </div>
  )
}
