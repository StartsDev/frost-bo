import { useState, useMemo, CSSProperties } from "react"
import Form, { Fields } from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"
import { THEME } from "../../theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../components/Loader/Loader";
import { showError } from "../../helpers";

const fields: Fields[] = [
  {
    name: "businessName",
    type: "text",
    label: "Nombre de la empresa o persona",
    placeholder: "Ingrese el nombre de la empresa o de la persona a crear como cliente",
    style:{width: '92%'},
  },
  {
    name: "nit",
    type: "number",
    label: "Cedula o Nit",
    placeholder: "Ingrese el numero del Nit o numero de cedula",
  },
  {
    name: "contact",
    type: "text",
    label: "Contacto",
    placeholder: "Ingrese nombre de contacto",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
  },
  {
    name: "address",
    type: "text",
    label: "Dirección",
    placeholder: "Ingrese dirección",
  },
  {
    name: "city",
    type: "text",
    label: "Ciudad",
    placeholder: "Ingrese ciudad de residencia",
  },
  {
    name: "phone",
    type: "number",
    label: "Número de teléfono",
    placeholder: "Teléfono",
  },
];

type ClientType = {
  businessName:string,
  nit: string,
  address: string,
  email: string,
  phone: string,
  city: string,
  contact: string
}

function AddClient() {

  const [client, setCleint] = useState<ClientType>({
    businessName:"",
    nit: "",
    address: "",
    email: "",
    phone: "",
    city: "",
    contact: ""
  })

  const [isLoading, setIsLoading] = useState(false)
  const fieldsWithEvent = useMemo(() => {
    const addEvent = fields.map(field => {
      const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCleint(prevClient => ({
          ...prevClient,
          [field.name]: event.target.value
        }));
      };
      return {
        ...field,
        onChange: handleFieldChange
      };
    });
  
    return addEvent;
  }, []);

  // const notify = () => {
  //   toast("Wow so easy!")
  // };

  
  const nameChange = (info: string) => {
    switch (info) {
      case 'businessName':
        return 'Nombre de la empresa';    
      case 'nit':
        return 'Nit o cedula';    
      case 'address':
        return 'Dirección';    
      case 'email':
        return 'Email';    
      case 'phone':
        return 'Teléfono';    
      case 'city':
        return 'Ciudad';    
      case 'contact':
        return 'Contacto';    
        default:
          break;
    }
  }
  
  const sendData = () => {
    setIsLoading(true)
    fetch(`${ENDPOINT.clients.add}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem('key')!
      },
      body: JSON.stringify(client)
    }).then((res) => {
      if(!res.ok) {
        toast.error('El cliente no pudo ser creado, por favor consulte con el administrador')
      } else {
        toast.success(`El cliente ${client.businessName} ha sido creado con exito`)
      }
    }).catch((e) => {
      console.log(e)
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
    <ToastContainer />
    {isLoading ? <Loader/> :
    <>
      <p style={componentStyles.description}>En este formulario podras crear los clientes a los cuales prestar servicios, todos los campos deben estar diligenciados</p>
        <Form
            fields={fieldsWithEvent}
            action={() => sendData()}
            btnText="Crear cliente"
            error={showError(client, nameChange)}
        />
        {showError(client, nameChange)}
    </>
      }
        </View>
  )
}

interface ComponentStyles {
  description: CSSProperties;
}

const componentStyles: ComponentStyles = {
  description: {
    color: THEME.secondary,
    width: '100%',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5
  }
}

export default AddClient