import { THEME } from "../../../theme"
import styles from "./op.moduel.css"

function Option() {
  return (
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
  )
}

export default Option