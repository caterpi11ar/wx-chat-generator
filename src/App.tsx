import type { FC } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import HomePage from '@/pages/HomePage'

const App: FC = () => {
  return (
    <>
      <SpeedInsights />
      <HomePage />
    </>
  )
}

export default App
