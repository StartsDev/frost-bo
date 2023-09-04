import { useState, useMemo } from "react"
import Form from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"

const fields = [
  {
    name: "contact",
    type: "text",
    label: "Contacto",
    placeholder: "Contacto"
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email"
  },
  {
    name: "address",
    type: "text",
    label: "Dirección",
    placeholder: "Dirección"
  },
  {
    name: "city",
    type: "text",
    label: "Ciudad",
    placeholder: "Ciudad"
  },
  {
    name: "phone",
    type: "text",
    label: "Teléfono",
    placeholder: "Teléfono"
  },
  {
    name: "businessName",
    type: "text",
    label: "Nombre negocio",
    placeholder: "Nombre negocio"
  },
  {
    name: "nit",
    type: "text",
    label: "NIT",
    placeholder: "NIT"
  }
];

function AddClient() {

  const [client, setCleint] = useState({
    businessName:"",
    nit: "",
    address: "",
    email: "",
    phone: "",
    city: "",
    contact: ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCleint({...client, [event.target.name]: event.target.value})
  }

  const fieldsWithEvent = useMemo(() => {
    
    const addEvent = fields.map(field => ({
      ...field,
      onChange: handleChange
    }))

    return addEvent
  }, [])

  const sendData = () => {
    console.log(client)
    fetch(`${ENDPOINT.clients.add}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client)
    }).then(() => {
      setIsLoading(true)
    }).catch(() => {
      console.log('error')
    })
    .finally(() => {
      setIsLoading(false)
      setCleint({
        businessName:"",
        nit: "",
        address: "",
        email: "",
        phone: "",
        city: "",
        contact: ""
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
            btnText="Crear cliente"
        />
        <p>{isLoading ? "Cargando..." : ""}</p>
    </View>
  )
}

export default AddClient