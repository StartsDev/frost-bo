import { mapPropertiesOfItems } from "./utils"

interface Props {
    headers: string[] | [],
    items: any[],
}

type Info = {
    orderOfJob: string
    nameClient: string
    date: string
    nameOfTechnical: string
    state: boolean,
}

function Table() {

    const headers = ["orderOfJob", "nameClient", "date", "nameOfTechnical", "state"]
    const items: Info[] = [
        {
            orderOfJob: "2",
            nameClient: "jhon",
            date: "22/01/2023",
            nameOfTechnical: "julio",
            state: false
        },
        {
            orderOfJob: "1",
            nameClient: "samanta",
            date: "20/01/2023",
            nameOfTechnical: "carlos",
            state: true
        },
        {
            orderOfJob: "4",
            nameClient: "jhonatan",
            date: "22/01/2023",
            nameOfTechnical: "juan",
            state: true
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
                        return <p key={index} style={{ width: "20%", backgroundColor: "green" }} >{item}</p>
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
                    items.map(item => {
                        return (<div key={item.orderOfJob} style={{ width: "100%", display: "flex" }}>
                            {
                                mapPropertiesOfItems(item).map((item, index) => {
                                    return <p key={index} style={{ width: "20%", backgroundColor: "green" }} >{item}</p>
                                })
                            }
                        </div>)
                    })
                }
            </section>
        </div>
    )


}

export default Table