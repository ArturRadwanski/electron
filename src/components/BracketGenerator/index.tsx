import { ReactNode, ButtonHTMLAttributes, HTMLAttributes } from 'react'

//import { } from './styles'

type BracketGeneratorProps = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLDivElement>

export function BracketGenerator(props: HTMLAttributes<HTMLElement>) {
  return <div {...props} />
}
