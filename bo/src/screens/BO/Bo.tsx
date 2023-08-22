import { useEffect } from "react"
import { THEME } from "../../theme"
import Avatar from "../../components/avatar/Avatar"
import styles from "./bo.module.css"
import { MdDescription } from "react-icons/md"
import Table from "../../components/table/Table"
import Option from "./components/Option"

function Bo() {

    useEffect(() => {
        const listElements = document.querySelectorAll(".list__button--click")

        listElements.forEach(element => {

            element.addEventListener("click", () => {
                let height = 0
                let menu = element.nextElementSibling

                if (menu?.clientHeight == 0) {
                    height = menu.scrollHeight
                }

                //@ts-expect-error
                menu.style.height = `${height}px`
            })

        })

    }, [])

    return (
        <section
            style={{ backgroundColor: THEME.white_primary }}
            className={styles?.wrapper}
        >
            <div
                style={{
                    width: "100%",
                    padding: "10px 6rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <h2>Frost Office</h2>
                <Avatar />
            </div>
            <section
                className={styles?.wrapper_bo}
            >
                <aside
                    style={{
                        width: "12%",
                        height: "100%",
                    }}
                >
                   <Option
                        titleOption="Option 1"
                        Icon={<MdDescription />}
                        options={[{ route: "/bo/option1", title: "Option 1 route" }]}
                   />
                   <Option
                        titleOption="Option 2"
                        Icon={<MdDescription />}
                        options={[{ route: "/bo/option1", title: "Option 2 route" }]}
                   />
                   <Option
                        titleOption="Option 3"
                        Icon={<MdDescription />}
                        options={[{ route: "/bo/option1", title: "Option 3 route" }]}
                   />
                   <Option
                        titleOption="Option 4"
                        Icon={<MdDescription />}
                        options={[{ route: "/bo/option1", title: "Option 4 route" }]}
                   />
                   <Option
                        titleOption="Option 5"
                        Icon={<MdDescription />}
                        options={[{ route: "/bo/option1", title: "Option 5 route" }]}
                   />
                </aside>
                <section
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "4rem",
                        gap: 5,
                    }}
                >
                    <h1
                        style={{
                            width: "85%",
                            padding: "10px 0",
                            fontSize: "1.5rem"
                        }}
                    >
                        Rodrigo Rodriguez 🚀
                    </h1>
                    <div
                        style={{ width: "85%" }}
                    >
                        <button
                            style={{
                                width: 120,
                                height: 30,
                                backgroundColor: THEME.black,
                                color: THEME.white,
                                border: "none",
                                borderRadius: 5,
                                fontSize: "1rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly"
                            }}
                        >
                            export csv <MdDescription />
                        </button>
                    </div>
                    <div
                        style={{
                            width: "80%",
                            height: "80%",
                            borderRadius: 10,
                            backgroundColor: THEME.white,
                            boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)"
                        }}
                    >
                        <Table />
                    </div>
                </section>
            </section>
        </section>
    )
}

export default Bo