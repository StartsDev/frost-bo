import type {  PropsWithChildren } from "react"
import { THEME } from "../../theme"

type Props = PropsWithChildren<{}>

function View({ children }: Props) {
  return (
    <div
        style={{
        width: "90%",
        height: 430,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: THEME.white,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)"
        }}
    >
        {children}
    </div>
  )
}

export default View