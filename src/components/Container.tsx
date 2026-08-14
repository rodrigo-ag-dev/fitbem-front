import type { ReactNode } from 'react'

export const Container = ({ children }: { children: ReactNode }) => (
  <div className="container" style={{ maxHeight: 75 }}>
    {children}
  </div>
)
