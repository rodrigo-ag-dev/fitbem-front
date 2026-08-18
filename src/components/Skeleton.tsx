import type { CSSProperties } from 'react'

interface SkeletonProps {
  className?: string
  style?: CSSProperties
}

export const Skeleton = ({ className = '', style }: SkeletonProps) => (
  <div className={`skeleton ${className}`.trim()} style={style} />
)

export const ProfessionalCardSkeleton = () => (
  <div className="professionalCard">
    <div className="professionalCardBadge" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Skeleton style={{ width: 120, height: 26, borderRadius: 100 }} />
    </div>
    <div className="professionalCardBody">
      <div className="professionalCardDetails">
        <Skeleton className="skeletonLine" style={{ width: '75%' }} />
        <Skeleton className="skeletonLine" style={{ width: '55%' }} />
        <Skeleton className="skeletonLine" style={{ width: '65%' }} />
      </div>
      <div className="professionalCardSpecialty">
        <Skeleton className="skeletonLine" style={{ width: '40%', marginBottom: 8 }} />
        <Skeleton className="skeletonLine" style={{ marginBottom: 6 }} />
        <Skeleton className="skeletonLine" style={{ width: '80%' }} />
      </div>
    </div>
  </div>
)

export const NotifyRowSkeleton = () => (
  <div className="notifyRegister">
    <div className="notifyLeftRegister">
      <Skeleton className="skeletonCircle" style={{ width: 24, height: 24, marginInline: 10 }} />
      <Skeleton className="skeletonLine" style={{ width: 60, height: 14, marginInline: 10 }} />
    </div>
    <div className="notifyRightRegister">
      <Skeleton className="skeletonLine" style={{ width: 100, marginBottom: 8 }} />
      <Skeleton className="skeletonLine" style={{ width: '80%' }} />
    </div>
  </div>
)

export const HistoryRowSkeleton = () => (
  <div className="histRow">
    <Skeleton className="skeletonCircle" style={{ width: 42, height: 42 }} />
    <div className="histInfo">
      <Skeleton className="skeletonLine" style={{ width: 90, height: 13, marginBottom: 6 }} />
      <Skeleton className="skeletonLine" style={{ width: 60, height: 11 }} />
    </div>
  </div>
)
