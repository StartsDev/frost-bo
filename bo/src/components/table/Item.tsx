type Props = {
    value: string | boolean | number | any
    action?: () => void
}

type PropItemStyle = {
    children: React.ReactNode
}

function ItemStyle({ children }: PropItemStyle) {
   return <p
        style={{
            border: "1px solid #c2c2be",
            width: "20%"
        }}
    >
        {children}
    </p>
}

function Item({ value, action }: Props) {

    if (typeof value === "string" && value === "edit") {
        return (
            <ItemStyle>
                <button onClick={action} >Editar</button>
            </ItemStyle>
        )
    }

    if (typeof value === "string" && value === "delete") {
        return (
            <ItemStyle>
                <button onClick={action} >Eliminar</button>
            </ItemStyle>
        )
    }

    return (
        <ItemStyle>
            {value}
        </ItemStyle>
    )

}

export default Item