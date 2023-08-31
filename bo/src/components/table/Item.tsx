import Button from '../button/Button'
import styles from './table.module.css'
import { Balancer } from 'react-wrap-balancer'

type Props = {
    value: string | boolean | number | any
    action?: () => void | undefined,
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
                <Button
                    text='Editar'
                    action={action}
                    h={20}
                    w={100}
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
                />
            </ItemStyle>
        )
    }

    return (
        <ItemStyle>
            <Balancer>
                {value}
            </Balancer>
        </ItemStyle>
    )

}

export default Item