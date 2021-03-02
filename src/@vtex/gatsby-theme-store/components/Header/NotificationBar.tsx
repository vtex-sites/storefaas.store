import { Box } from '@vtex/store-ui'
import React from 'react'
import type { FC } from 'react'

interface Props {
  text: string
  variant?: string
}

const test = async () => {
  fetch('/functions/hello?name=VTEX').then((resp) =>
    resp.text().then((text) => alert(text))
  )
}

const StoreHeaderNotificationBar: FC<Props> = ({ variant }) => (
  <Box variant={variant} onClick={test}>
    SERVERLESS FUNCTIONS TEST
  </Box>
)

export default StoreHeaderNotificationBar
