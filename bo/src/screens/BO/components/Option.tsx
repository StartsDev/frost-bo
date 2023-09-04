import { useNavigate } from "react-router-dom"
import { THEME } from "../../../theme"

type ItemForOptions = { route: string, title: string }

interface Props {
    Icon?: React.ReactNode
    titleOption: string
    options: ItemForOptions[]
}

function Option({ Icon, titleOption, options }: Props) {

    const navigate = useNavigate()

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
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "1em",
            width: "75%",
            margin: "0 auto"
        }}
    >
        <div style={{
            width: "30px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {Icon}
        </div>
        <p className="nav_link"
            style={{
                display: "block",
                padding: "10px 0",
                textAlign: "left",
                width: "100%"
            }}
        >{titleOption}</p>
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
        {
            options.map((option, index) => {
                return (
                    <li key={index} className="list__inside">
                        <p className="nav__link nav__link--inside"
                            style={{
                                display: "block",
                                padding: "15px 0",
                                textDecoration: "none",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                navigate(option.route)
                            }}
                        >
                            {option.title}
                        </p>
                     </li>
                )
            })
        }
    </ul>
</li>
  )
}

export default Option