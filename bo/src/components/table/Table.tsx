import Item from "./Item"
import { mapPropertiesOfItems } from "./utils"

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

    const headers = ["orderOfJob", "nameClient", "date", "nameOfTechnical", "state", "Accion"]
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
            action: ""
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
                                style={{ width: "20%", border: "1px solid #c2c2be", textAlign: "center"  }}
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
                    flexDirection: "column"
                }}
            >
                {
                    items.map(item => (
                        <div key={item.orderOfJob} style={{ width: "100%", display: "flex" }}>
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