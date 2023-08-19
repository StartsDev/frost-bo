import styles from './table.module.css'

type Props = {
    value: string | boolean | number | any
    action?: () => void,
}

type PropItemStyle = {
    children: React.ReactNode
}

function ItemStyle({ children }: PropItemStyle) {
   return <p
        className={styles.item}
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