import Item from "./Item"
import { mapPropertiesOfItems } from "./utils"
import styles from "./table.module.css"
import { THEME } from "../../theme"
import { useGetClients } from "../../hooks/useClients"

interface Props<T> {
    headers: string[] | [],
    items: T[],
}

type Info = {
    orderOfJob: string
    nameClient: string
    date: string
    nameOfTechnical: string
    state: boolean,
    action?: string
}

function Table() {

    const { clients, loading } = useGetClients()

    console.log(clients, loading)

    const headers = ["Orden de trabajo", "Cliente", "Fecha", "Tecnico", "Estado", "Accion"]
    const items: Info[] = [
        {
            orderOfJob: "2",
            nameClient: "jhon",
            date: "22/01/2023",
            nameOfTechnical: "julio",
            state: false,
            action: "edit"
        },
        {
            orderOfJob: "1",
            nameClient: "samanta",
            date: "20/01/2023",
            nameOfTechnical: "carlos",
            state: true,
            action: "delete",
        },
        {
            orderOfJob: "4",
            nameClient: "jhonatan",
            date: "22/01/2023",
            nameOfTechnical: "juan",
            state: true,
            action: "delete"
        },
        {
            orderOfJob: "55",
            nameClient: "Pedro",
            date: "2/04/2023",
            nameOfTechnical: "Jean",
            state: true,
            action: "edit"
        },
    ]

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
                            key={item.orderOfJob}
                            style={{ 
                                display: "flex",
                                backgroundColor: index % 2 === 0 ? THEME.white : THEME.blue,
                                borderRadius: 5,
                                color: index % 2 === 0 ? THEME.black : THEME.white
                            }}
                        >
                            {
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