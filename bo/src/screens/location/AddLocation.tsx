import { useState, useMemo } from "react"
import Form from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"

const fields = [
  {
    name: "name",
    type: "text",
    label: "Nombre",
    placeholder: "Nombre ubicación"
  },
  {
    name: "description",
    type: "text",
    label: "Descripción",
    placeholder: "Descripción"
  }
];

function AddLocation() {

  const [location, setLocation] = useState({
    locationName:"",
	description:"",
	headquarterId:""
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation({...location, [event.target.name]: event.target.value})
  }

  const fieldsWithEvent = useMemo(() => {
    
    const addEvent = fields.map(field => ({
      ...field,
      onChange: handleChange
    }))

    return addEvent
  }, [])

  const sendData = () => {
    console.log(location)
    fetch(`${ENDPOINT.location.add}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location)
    }).then(() => {
      setIsLoading(true)
    }).catch(() => {
      console.log('error')
    })
    .finally(() => {
      setIsLoading(false)
      setLocation({
        description: "",
        headquarterId: "",
        locationName: ""
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
            btnText="Crear ubicación"
        />
        <p>{isLoading ? "Cargando..." : ""}</p>
    </View>
  )
}

export default AddLocation