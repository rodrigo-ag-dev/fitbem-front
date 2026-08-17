import favIcon from '../assets/images/fav.png'
import cityIcon from '../assets/images/city.png'
import whatsappIcon from '../assets/images/whatsapp.png'
import type { Professional } from '../types'

const DetailRow = ({ icon, text, bold }: { icon: string; text: string; bold?: boolean }) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 23, height: 23 }}>
      <img src={icon} alt="" />
    </div>
    <p
      style={
        bold
          ? { fontSize: 15, fontWeight: 700, color: 'var(--ink)' }
          : { fontSize: 12.5, color: 'var(--muted)' }
      }
    >
      {text}
    </p>
  </div>
)

type ProfessionalCardProps = Pick<Professional, 'description' | 'city' | 'whatsapp' | 'specialty' | 'category'>

export const ProfessionalCard = ({ description, city, whatsapp, specialty, category }: ProfessionalCardProps) => (
  <div className="professionalCard">
    <div className="professionalCardBadge">
      <p>{category}</p>
    </div>
    <div className="professionalCardBody">
      <div className="professionalCardDetails">
        <DetailRow icon={favIcon} text={description} bold />
        <DetailRow icon={cityIcon} text={city} />
        <DetailRow icon={whatsappIcon} text={whatsapp} />
      </div>
      <div className="professionalCardSpecialty">
        <p style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)' }}>Especialidade:</p>
        <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: '1.3rem', textAlign: 'justify' }}>
          {specialty}
        </p>
      </div>
    </div>
  </div>
)
