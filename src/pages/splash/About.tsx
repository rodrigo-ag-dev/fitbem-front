import calcIcon from '../../assets/images/calc.png'
import profissionalIcon from '../../assets/images/profissional.png'

export const About = () => (
  <div className="aboutBody">
    <div className="aboutDetail">
      <div className="about1">
        <p className="aboutDetailName">Fit Bem</p>
        <p className="aboutDetailTitle">SUA JORNADA PARA UMA VIDA MAIS SAUDÁVEL</p>
        <p className="aboutDetailText">
          Nossa missão é te ajudar a transformar seus objetivos de bem-estar em realidade.
        </p>
      </div>
      <div className="about2" />
    </div>
    <div className="aboutFooter">
      <div className="aboutFooterDiv">
        <div className="footerTitle">
          <img src={calcIcon} alt="" />
          <span>CALCULADORA IMC COM HISTÓRICO</span>
        </div>
        <p className="footerText">
          Oferecemos uma calculadora de IMC fácil de usar com histórico para rastrear seu progresso em direção ao
          peso ideal ao longo do tempo.
        </p>
      </div>
      <div className="aboutFooterDiv">
        <div className="footerTitle">
          <img src={profissionalIcon} alt="" />
          <span>ACESSO A PROFISSIONAIS DE SAÚDE</span>
        </div>
        <p className="footerText">
          Conexão direta a uma equipe diversificada de profissionais de saúde, incluindo médicos especializados,
          nutricionistas e personal trainers.
        </p>
      </div>
    </div>
  </div>
)
