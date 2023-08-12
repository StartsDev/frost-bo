import { useEffect } from "react"
import { THEME } from "../../theme"
import Avatar from "../../components/avatar/Avatar"
import styles from "./bo.module.css"
import { MdDescription } from "react-icons/md"
import Table from "../../components/table/Table"

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
                    padding: "1rem 6rem",
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
                        width: "15%",
                        height: "100%",
                    }}
                >
                    <li
                        className="list_item list__item--click"
                        style={{
                            listStyle: "none",
                            width: "100%",
                            textAlign: "center",
                            overflow: "hidden"
                        }}
                    >
                        <div
                            className="list_button list__button--click"
                            style={{
                                //cursor pointer para --click
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "1em",
                                width: "70%",
                                margin: "0 auto"
                            }}
                        >
                            <img src="" alt="" className="list_img" />
                            <a href="" className="nav_link"
                                style={{
                                    display: "block",
                                    padding: "15px 0",
                                    textDecoration: "none"
                                }}
                            >Opcion</a>
                            <img src="" alt="" className="list_arrow" style={{
                                marginLeft: "auto"
                            }} />
                        </div>
                        <ul className="list__show"
                            style={{
                                width: "80%",
                                marginLeft: "auto",
                                borderLeft: "2px solid " + THEME.black,
                                listStyle: "none",
                                transition: "height .4s",
                                height: 0
                            }}
                        >
                            <li className="list__inside">
                                <a href="" className="nav__link nav__link--inside"
                                    style={{
                                        display: "block",
                                        padding: "15px 0",
                                        textDecoration: "none"
                                    }}
                                >Estoy dentro</a>
                            </li>
                            <li className="list__inside">
                                <a href="" className="nav__link nav__link--inside"
                                    style={{
                                        display: "block",
                                        padding: "15px 0",
                                        textDecoration: "none"
                                    }}
                                >Estoy dentro</a>
                            </li>
                            <li className="list__inside">
                                <a href="" className="nav__link nav__link--inside"
                                    style={{
                                        display: "block",
                                        padding: "15px 0",
                                        textDecoration: "none"
                                    }}
                                >Estoy dentro</a>
                            </li>
                            <li className="list__inside">
                                <a href="" className="nav__link nav__link--inside"
                                    style={{
                                        display: "block",
                                        padding: "15px 0",
                                        textDecoration: "none"
                                    }}
                                >Estoy dentro</a>
                            </li>
                        </ul>
                    </li>
                </aside>
                <section
                    style={{
                        width: "85%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "4rem",
                        gap: 10,
                        overflowY: "scroll"
                    }}
                >
                    <h1
                        style={{
                            width: "85%",
                            padding: "1rem 0",
                            fontSize: "2.5rem"
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
                                height: 40,
                                backgroundColor: THEME.black,
                                color: THEME.white,
                                border: "none",
                                borderRadius: 5,
                                fontSize: "1.1rem",
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
                            height: 650,
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