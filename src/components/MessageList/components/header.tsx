import type { Dayjs } from 'dayjs'
import type { FC } from 'react'
import dayjs from 'dayjs'
import battery from '@/assets/images/ios-battery-dark.png'
import signal from '@/assets/images/ios-single-4-dark.png'
import wifi from '@/assets/images/ios-wifi-3-dark.png'

interface Props {
  time?: Dayjs | null
}

const Header: FC<Props> = ({ time }) => {
  return (
    <div
      className="nav-bar flex items-center pl-14 pr-5 py-2.5 !hidden"
      style={{ color: '#353535' }}
    >
      <div className="text-sm font-semibold flex-1">
        {(time || dayjs()).format('HH:mm')}
      </div>
      <div>
        <img src={signal} style={{ height: '13px' }} />
      </div>
      <div className="ml-1">
        <img src={wifi} style={{ height: '13px' }} />
      </div>
      <div className="ml-1 relative">
        <img src={battery} style={{ height: '13px' }} />
        <div
          className="bg-black rounded-sm absolute"
          style={{ height: '8px', width: '60%', top: '2.5px', left: '2px' }}
        >
        </div>
      </div>
    </div>
  )
}

export default Header
