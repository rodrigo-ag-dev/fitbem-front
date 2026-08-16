import favIcon from '../assets/images/fav.png'
import cityIcon from '../assets/images/city.png'
import whatsappIcon from '../assets/images/whatsapp.png'
import type { Professional } from '../types'

const DetailRow = ({ icon, text, bold }: { icon: string; text: string; bold?: boolean }) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 23, height: 23 }}>
      <img src={icon} alt="" />
    </div>
    <p style={bold ? { fontSize: 16, fontWeight: 'bold', color: '#0d2c34' } : { fontSize: 12, color: '#236678' }}>
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
        <p style={{ fontSize: 14, color: '#0d2c34' }}>Especialidade:</p>
        <p style={{ fontSize: 12, color: '#236678', lineHeight: '1.2rem', textAlign: 'justify' }}>{specialty}</p>
      </div>
    </div>
  </div>
)
