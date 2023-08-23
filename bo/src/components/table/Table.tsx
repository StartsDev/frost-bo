import Item from "./Item"
import { mapPropertiesOfItems } from "./utils"
import styles from "./table.module.css"
import { THEME } from "../../theme"

interface Props<T> {
    headers: string[] | [],
    items: T[],
}

function Table<T>({ headers, items }: Props<T>) {
    return (
        <div>
            <section
                style={{
                    width: "100%",
                    height: "20",
                    display: "flex",
                }}
            >
                {
                    headers.map((item, index) => {
                        return (
                            <p  key={index}
                                className={styles.headers}
                                style={{color: THEME.blue}}
                            >
                                    {item}
                            </p>
                        )
                    })
                }
            </section>
            <section
                style={{
                    width: "100%",
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {
                    items.map((item, index) => (
                        <div 
                            key={index}
                            style={{ 
                                display: "flex",
                                backgroundColor: index % 2 === 0 ? THEME.white : THEME.blue,
                                borderRadius: 5,
                                color: index % 2 === 0 ? THEME.black : THEME.white
                            }}
                        >
                            {
                                //@ts-expect-error
                                mapPropertiesOfItems(item).map((value, index) => {
                                    return <Item key={index} value={value} />
                                })
                            }
                        </div>
                    ))
                }
            </section>
        </div>
    )


}

export default Table