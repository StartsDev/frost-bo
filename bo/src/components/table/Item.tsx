import Button from '../button/Button'
import styles from './table.module.css'
import { evaluateIndex } from './utils'

type Props = {
    value: string | boolean | number | any
    action?: () => void | undefined,
    index: number
}

type PropItemStyle = {
    children: React.ReactNode
    index?: number
}

function ItemStyle({ children }: PropItemStyle) {
   return <p
        className={styles.item}
    >
        {children}
    </p>
}

function Item({ value, action, index }: Props) {

    if (typeof value === "string" && value === "edit") {
        return (
            <ItemStyle>
                <Button
                    text='Editar'
                    action={action}
                    h={30}
                    w={100}
                    bg={evaluateIndex(index)}
                />
            </ItemStyle>
        )
    }

    if (typeof value === "string" && value === "delete") {
        return (
            <ItemStyle>
                <Button
                    text='Eliminar'
                    action={action}
                    h={30}
                    bg={evaluateIndex(index)}
                />
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