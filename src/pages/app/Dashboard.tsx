import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { API_BASE } from '../../lib/api'
import { BMICalc, BMIStatus, FormatDate, idealWeight } from '../../lib/format'
import campaign1 from '../../assets/images/anuncios/image1.jpg'
import campaign2 from '../../assets/images/anuncios/image2.jpg'
import campaign3 from '../../assets/images/anuncios/image3.jpg'
import type { HistoryEntry } from '../../types'

const campaigns = [campaign1, campaign2, campaign3]
const CAMPAIGN_INTERVAL = 3500

const HistoryRow = ({ entry }: { entry: HistoryEntry }) => {
  const bmi = BMICalc(entry.weight, entry.height)
  return (
    <div className="histRow">
      <div className="histBadge">{bmi}</div>
      <div className="histInfo">
        <span className="status">{BMIStatus(bmi)}</span>
        <span className="date">{FormatDate(entry.day)}</span>
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
      .then((json: HistoryEntry[]) => setHistory(Array.isArray(json) ? json : []))
      .catch(() => {})
  }, [user])

  useEffect(() => {
    const id = setInterval(() => {
      setCampaignIndex((prev) => (prev + 1) % campaigns.length)
    }, CAMPAIGN_INTERVAL)
    return () => clearInterval(id)
  }, [])

  if (!user) return null

  const water = ((user.weight * 3.5) / 100).toFixed(1)

  return (
    <div className="appCenter">
      <div className="board">
        <div className="boardTop">
          <span className="boardEyebrow">Índices</span>
          <div className="boardWho">
            <span>{user.name}</span>
            <div className="avatar" />
          </div>
        </div>

        <div className="bentoGrid">
          <div className="tile tileRing">
            <svg width="92" height="92" viewBox="0 0 92 92" aria-hidden="true">
              <circle cx="46" cy="46" r="38" stroke="rgba(255,255,255,.3)" strokeWidth="9" fill="none" />
              <circle
                cx="46"
                cy="46"
                r="38"
                stroke="#fff"
                strokeWidth="9"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="238.8"
                strokeDashoffset="64"
                transform="rotate(-90 46 46)"
              />
            </svg>
            <div className="ringTxt">
              <span className="k">Índice de massa corporal</span>
              <div className="v">{user.bmi}</div>
              <span className="chip">{BMIStatus(user.bmi)}</span>
            </div>
          </div>

          <div className="tile tileStat tilePeso">
            <span className="k">Peso</span>
            <div className="v">{user.weight} kg</div>
          </div>
          <div className="tile tileStat sky tileAltura">
            <span className="k">Altura</span>
            <div className="v">{user.height / 100} m</div>
          </div>
          <div className="tile tileStat lime tileIdeal">
            <span className="k">Peso ideal</span>
            <div className="v">{idealWeight(user.height)} kg</div>
          </div>
          <div className="tile tileStat tileAgua">
            <span className="k">Água por dia</span>
            <div className="v">{water} L</div>
          </div>

          <div className="tile tileHist">
            <p className="histTitle">Resultados anteriores</p>
            {history.map((entry, index) => (
              <HistoryRow key={index} entry={entry} />
            ))}
          </div>

          <div className="tile tileCampaign">
            {campaigns.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Campanha ${index + 1}`}
                style={{ marginLeft: index === campaignIndex ? '0%' : '100%' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
