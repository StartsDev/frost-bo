import Item from "./Item"
import { mapPropertiesOfItems } from "./utils"
import styles from "./table.module.css"
import { THEME } from "../../theme"
 
interface Props<T> {
    headers: string[] | [],
    items: T[],
    actionItem?: (param?: any) => void
}

function Table<T>({ headers, items, actionItem }: Props<T>) {
    return (
        <div
            style={{ width: "100%", height: "100%" }}
        >
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
                                style={{color: THEME.blue, width: "100%"}}
                            >
                                    {item}
                            </p>
                        )
                    })
                }
            </section>
            <section
                className={styles.table}
                style={{
                    width: "100%",
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "scroll",
                    overflow: "hidden"
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
                            onClick={() => {
                                localStorage.setItem('item', JSON.stringify(item))
                                actionItem && actionItem()
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