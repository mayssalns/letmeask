import { ButtonHTMLAttributes } from 'react'

import '../styles/components/button.scss';

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export function Button({ isOutlined = false, ...props }: TProps) {
  return (
    <button
      className={`btn ${isOutlined ? 'outlined' : ''}`}
      {...props}
    />
  )
}