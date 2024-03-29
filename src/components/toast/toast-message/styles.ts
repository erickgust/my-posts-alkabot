import styled, { css } from 'styled-components'
import { ToastType } from '../toast-types'

const colorVariants = {
  success: css`
    background-color: ${({ theme }) => theme.colors.success};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors.danger};
  `,
  default: css`
    background-color: ${({ theme }) => theme.colors.primary};
  `,
}

type ContainerProps = {
  type?: ToastType
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.6rem 3.2rem;
  border-radius: 0.4rem;

  background-color: ${({ theme }) => theme.colors.primary};
  color: #FFF;
  font-size: 1.6rem;

  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);

  cursor: pointer;

  img {
    margin-right: 0.8rem;
  }

  & + & {
    margin-top: 1.2rem;
  }

  ${({ type }) => colorVariants[type || 'default'] || colorVariants.default}
`
