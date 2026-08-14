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
  <div style={{ marginLeft: 15, marginTop: 30 }}>
    <div
      style={{
        position: 'relative',
        top: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 174,
        height: 37,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: -17,
        backgroundColor: '#4f808d',
        marginLeft: 'calc(calc(calc(343px + 30px) / 2) - calc(174px / 2))',
        boxShadow: '5px 5px 16px -8px rgba(0,0,0,1)',
      }}
    >
      <p style={{ color: '#ffffff' }}>{category}</p>
    </div>
    <div
      style={{
        padding: 15,
        paddingTop: 27,
        width: 333,
        height: 210,
        maxHeight: 210,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        boxShadow: '5px 5px 16px -8px rgba(0,0,0,1)',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: 90, justifyContent: 'space-evenly' }}>
        <DetailRow icon={favIcon} text={description} bold />
        <DetailRow icon={cityIcon} text={city} />
        <DetailRow icon={whatsappIcon} text={whatsapp} />
      </div>
      <div style={{ marginTop: 15, overflow: 'hidden', maxHeight: 97 }}>
        <p style={{ fontSize: 14, color: '#0d2c34' }}>Especialidade:</p>
        <p style={{ fontSize: 12, color: '#236678', lineHeight: '1.2rem', textAlign: 'justify' }}>{specialty}</p>
      </div>
    </div>
  </div>
)
