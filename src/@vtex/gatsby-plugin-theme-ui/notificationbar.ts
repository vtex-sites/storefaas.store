import { headerTheme, createTheme, SxStyleProp } from '@vtex/store-ui'

const custom: SxStyleProp = {
  header: {
    bg: '#E23B56',

    notificationbar: {
      bg: 'blue',
      minHeight: 20,
      color: 'white',
      textDecoration: 'none',
      cursor: 'pointer',
    },
  },
}

export default createTheme(headerTheme, custom)

