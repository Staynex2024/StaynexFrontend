import { Button } from '@mui/material'
import React from 'react'

export const MainButton = ({
  text,
  bgcolor,
  variant,
  color,
  width,
  onClick,
  disable,
}) => {
  return (
    <Button
      // color={bgcolor}
      variant={variant}
      // sx={{ color: color, width: width }}
      onClick={onClick}
      disabled={disable}
    >
      {text}
    </Button>
  )
}
