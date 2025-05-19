import React from 'react'

export interface GuardProps {
  cond: boolean
  children: React.ReactNode
}

const Guard: React.FC<GuardProps> = ({ cond, children }) =>
  cond ? <>{children}</> : null

export default Guard
