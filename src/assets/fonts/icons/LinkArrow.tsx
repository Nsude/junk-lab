import React from 'react'
import { useGlobalContext } from '../../../contexts/globalContext'

interface Props {
  color?: string,
  size?: number
}

const LinkArrow:React.FC<Props> = ({color, size}) => {
  const {colors} = useGlobalContext();
  return (
    <svg width={size || 14} height={size || 14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.03174 13.0087L13.0317 1.00901M13.0317 1.00901H2.60778M13.0317 1.00901C13.0317 4.40788 13.0317 9.56513 13.0317 11.7189" stroke={color || colors.black} strokeWidth="1.6"/>
    </svg>

  )
}

export default LinkArrow;