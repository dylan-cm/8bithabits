import React, { FC } from 'react'
import styled from '../styles/styled'
import * as Styles from '../styles'

const S: Styles.Component = Styles
S.Button = styled.button<any>`
  //? Can we clean up this styling code? Maybe split into different components?
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: ${({ icon }) => (!icon ? '8px 18px' : '12px 12px')};
  border-radius: 100px;
  border: 2px solid
    ${({ inverted, theme, color }) => (inverted ? theme.color.negative : color ? color : theme.color.primary)};
  font-size: 1.15rem;
  min-width: 44px;
  background-color: ${({ color, transparent, inverted, theme }) =>
    transparent ? 'transparent' : inverted ? (color ? color : theme.color.primary) : theme.color.negative};
  color: ${({ transparent, theme, color }) =>
    transparent ? theme.color.negative : color ? color : theme.color.primary};
  font-family: 'eurostile', sans-serif;
  font-weight: 400;
  cursor: pointer;
  transition: 250ms ease-in-out;

  &:hover {
    color: ${(props) => props.theme.color.negative};
    background-color: ${({ inverted, theme, color }) =>
      inverted ? theme.color.negative : color ? color : theme.color.primary};

    svg {
      fill: ${({ inverted, theme, color }) =>
        inverted ? (color ? color : theme.color.primary) : theme.color.negative};
    }
  }

  svg {
    fill: ${({ transparent, inverted, theme, color }) =>
      transparent || inverted ? theme.color.negative : color ? color : theme.color.primary};
    height: 1.5rem;
    padding-right: ${({ start }) => (start ? '8px' : '')};
    padding-left: ${({ end }) => (end ? '8px' : '')};
    transition: 250ms ease-in-out;
  }
`

interface ButtonProps {
  end?: boolean
  start?: boolean
  transparent?: boolean
  inverted?: boolean
  icon?: boolean
  color?: string
}

const OutlinedButton: FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return <S.Button {...props}>{children}</S.Button>
}

export default OutlinedButton
