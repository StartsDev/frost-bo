import { useState, useMemo } from "react"
import Form from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"

const fields = [
  {
    name: "headName",
    type: "text",
    label: "Nombre",
    placeholder: "Nombre Sede"
  },
  {
    name: "address",
    type: "text",
    label: "Dirección",
    placeholder: "Dirección"
  },
  {
    name: "email",
    type: "text",
    label: "Email",
    placeholder: "Email"
  },
  {
    name: "phone",
    type: "text",
    label: "Teléfono",
    placeholder: "Teléfono"
  }
];

function EditHeadSquare() {

  const [square, setSquare] = useState({
    headName: "",
    address: "",
    email: "",
    phone: "",
    clientId: ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSquare({...square, [event.target.name]: event.target.value})
  }

  const fieldsWithEvent = useMemo(() => {
    
    const addEvent = fields.map(field => ({
      ...field,
      onChange: handleChange
    }))

    return addEvent
  }, [])

  const sendData = () => {
    console.log(square)
    fetch(`${ENDPOINT.squares.update}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(square)
    }).then(() => {
      setIsLoading(true)
    }).catch(() => {
      console.log('error')
    })
    .finally(() => {
      setIsLoading(false)
      setSquare({
        address: "",
        email: "",
        headName: "",
        phone: "",
        clientId: ""
      })
    })
  }

  return (
    <View>
        <Form
            fields={fieldsWithEvent}
            action={() => {
              sendData()
            }}
            btnText="Editar sede"
        />
        <p>{isLoading ? "Cargando..." : ""}</p>
    </View>
  )
}

export default EditHeadSquare