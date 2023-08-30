import type {  PropsWithChildren } from "react"

type Props = PropsWithChildren<{}>

function Actions({ children }: Props) {
  return (
    <div
        style={{
            width: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly"
        }}
    >
        {children}
    </div>
  )
}

export default Actions