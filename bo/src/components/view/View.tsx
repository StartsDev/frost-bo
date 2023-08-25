import type {  PropsWithChildren } from "react"
import { THEME } from "../../theme"

type Props = PropsWithChildren<{}>

function View({ children }: Props) {
  return (
    <div
        style={{
        width: "80%",
        height: "80%",
        borderRadius: 10,
        backgroundColor: THEME.white,
        boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)"
        }}
    >
        {children}
    </div>
  )
}

export default View