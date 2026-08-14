import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { API_BASE } from '../../lib/api'
import { BMICalc, BMIStatus, FormatDate, idealWeight } from '../../lib/format'
import scaleIcon from '../../assets/images/scale.png'
import waterDropIcon from '../../assets/images/water_drop.png'
import campaign1 from '../../assets/images/anuncios/image1.jpg'
import campaign2 from '../../assets/images/anuncios/image2.jpg'
import campaign3 from '../../assets/images/anuncios/image3.jpg'
import type { HistoryEntry } from '../../types'

const campaigns = [campaign1, campaign2, campaign3]
const CAMPAIGN_INTERVAL = 3500

const HistoryRow = ({ entry }: { entry: HistoryEntry }) => {
  const bmi = BMICalc(entry.weight, entry.height)
  return (
    <div style={{ width: '100%', height: 65, marginBlock: 12, display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: 60,
          height: 60,
          marginLeft: 20,
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'var(--secundary-color-sel)',
        }}
      >
        <p style={{ color: 'var(--input-color)', fontSize: 16 }}>{bmi}</p>
      </div>
      <div style={{ marginInline: 20, display: 'flex', flexDirection: 'column' }}>
        <p style={{ color: 'var(--secondary-color)', fontSize: 16 }}>{BMIStatus(bmi)}</p>
        <p style={{ color: 'var(--primary-color)', fontSize: 16 }}>{FormatDate(entry.day)}</p>
      </div>
    </div>
  )
}

export const Dashboard = () => {
  const { user } = useAuth()
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [campaignIndex, setCampaignIndex] = useState(0)

  useEffect(() => {
    if (!user) return
    fetch(`${API_BASE}history/${user.userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((resp) => resp.json())
      .then((json: HistoryEntry[]) => setHistory(json ?? []))
      .catch(() => {})
  }, [user])

  useEffect(() => {
    const id = setInterval(() => {
      setCampaignIndex((prev) => (prev + 1) % campaigns.length)
    }, CAMPAIGN_INTERVAL)
    return () => clearInterval(id)
  }, [])

  if (!user) return null

  return (
    <>
      <div className="appCenter">
        <div className="appIndexTop">Indices</div>
        <div className="appIndexMiddle">
          <div className="appIndexDash">
            <div className="divRow divRow1">
              <div className="divTitle">Indice de massa corporal</div>
              <div className="divLast">
                <div className="divMainCircle">
                  <div className="divCircle">
                    <p style={{ position: 'absolute', top: 30 }}>PESO</p>
                    <p style={{ marginTop: 20 }}>{user.weight} kg</p>
                  </div>
                </div>
                <div
                  className="divMainCircle"
                  style={{ border: '14px solid var(--secundary-color-sel)', borderTop: 0 }}
                >
                  <div className="divCircle">
                    <p className="p2" style={{ position: 'absolute', top: 30 }}>
                      IMC
                    </p>
                    <p className="p2" style={{ marginTop: 20 }}>
                      {user.bmi}
                    </p>
                  </div>
                </div>
                <div className="divMainCircle">
                  <div className="divCircle">
                    <p style={{ position: 'absolute', top: 30 }}>ALTURA</p>
                    <p style={{ marginTop: 20 }}>{user.height / 100} m</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="divRow divRow2">
              <div className="divState">{BMIStatus(user.bmi)}</div>
            </div>
          </div>
        </div>
        <div className="appIndexBottom">
          <div className="appTips">
            <div className="appTipsTitle">Peso ideal:</div>
            <div className="appTipsIcon">
              <img src={scaleIcon} style={{ width: '2em', height: '2em' }} alt="" />
            </div>
            <div className="appTipsChild">
              <p>{idealWeight(user.height)} Kg</p>
            </div>
            <p className="appTipsInfo">*Valor médio para adultos</p>
          </div>
          <div className="appTips">
            <div className="appTipsTitle">Água por dia:</div>
            <div className="appTipsIcon">
              <img src={waterDropIcon} style={{ width: '2em', height: '2em' }} alt="" />
            </div>
            <div className="appTipsChild">
              <p>{((user.weight * 3.5) / 100).toFixed(1)} Litros</p>
            </div>
            <p className="appTipsInfo">*Valor médio para adultos</p>
          </div>
        </div>
      </div>
      <div className="appRight">
        <div className="appIndexTop">
          <p
            className="appIndexTop"
            style={{ fontSize: '16pt', display: 'flex', justifyContent: 'end', fontWeight: 300 }}
          >
            {user.name}
          </p>
        </div>
        <div className="appIndexMiddle" style={{ minHeight: 380.969 }}>
          <div
            className="appIndexDash"
            style={{ overflow: 'auto', backgroundColor: 'var(--splashMenu-bgcolor)', marginInline: 0 }}
          >
            <p
              style={{
                width: 'calc(100% - 20pt)',
                marginBlock: 15,
                paddingLeft: 20,
                color: 'var(--primary-color)',
                fontWeight: 'bold',
              }}
            >
              Resultados Anteriores
            </p>
            {history.map((entry, index) => (
              <HistoryRow key={index} entry={entry} />
            ))}
          </div>
        </div>
        <div className="divCampaign">
          {campaigns.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`imagem ${index + 1}`}
              style={{ marginLeft: index === campaignIndex ? '0%' : '100%' }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
