import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'

export const Slogan = () => {
  const navigate = useNavigate()

  return (
    <div className="splashSlogan">
      <div className="sloganBento">
        <div className="sloganMain">
          <p className="sloganKicker">Conexão saudável</p>
          <h1 className="sloganHeadline">Seu parceiro na busca pelo bem-estar</h1>
          <p className="sloganSub">
            Acompanhe seu IMC, seu peso e sua hidratação, e encontre profissionais de saúde perto de você — tudo num
            só lugar.
          </p>
          <Button caption="Cadastre-se →" className="sloganButton" onClick={() => navigate('/cadastro')} />
        </div>
        <div className="sloganTile sloganTileLime">
          <span className="tileBig">IMC</span>
          <span className="tileSmall">calculado em segundos, com histórico</span>
        </div>
        <div className="sloganTile sloganTileSky">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 12h12M4 9v6M20 9v6" stroke="#17302c" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>
            Profissionais de saúde
            <br />e preparadores parceiros
          </span>
        </div>
      </div>
    </div>
  )
}
