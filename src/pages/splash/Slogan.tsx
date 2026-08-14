import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'

export const Slogan = () => {
  const navigate = useNavigate()

  return (
    <div className="splashSlogan">
      <p className="sloganTitle">CONEXÃO SAUDÁVEL:</p>
      <p className="sloganText">Seu Parceiro na busca pelo Bem-Estar</p>
      <Button caption="CADASTRE-SE" className="sloganButton" onClick={() => navigate('/cadastro')} />
    </div>
  )
}
