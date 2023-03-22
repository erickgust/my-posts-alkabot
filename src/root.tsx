import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme } from './resources/theme'
import { App } from './app'

import 'normalize.css'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  button {
    cursor: pointer;
  }
`

export function Root () {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  )
}