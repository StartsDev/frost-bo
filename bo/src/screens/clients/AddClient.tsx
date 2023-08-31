import Form from "../../components/form/Form";
import View from "../../components/view/View";

const users = [
  {
    name: "John",
    type: "text",
    value: "john@example.com",
    onChange: (event: any) => {
      // Lógica para manejar el cambio del input
    },
    label: "Email"
  },
  {
    name: "Alice",
    type: "password",
    value: "",
    onChange: (event: any) => {
      // Lógica para manejar el cambio del input
    },
    label: "Password"
  },
  {
    name: "Bob",
    type: "text",
    value: "123 Main St",
    onChange: (event: any) => {
      // Lógica para manejar el cambio del input
    },
    label: "Address"
  },
  // Agrega más usuarios aquí...
  {
    name: "Bob",
    type: "text",
    value: "123 Main St",
    onChange: (event: any) => {
      // Lógica para manejar el cambio del input
    },
    label: "Address"
  },
  {
    name: "Bob",
    type: "text",
    value: "123 Main St",
    onChange: (event: any) => {
      // Lógica para manejar el cambio del input
    },
    label: "Address"
  },
  {
    name: "Bob",
    type: "text",
    value: "123 Main St",
    onChange: (event: any) => {
      // Lógica para manejar el cambio del input
    },
    label: "Address"
  }
];

function AddClient() {
  return (
    <View>
        <Form
            fields={users}
            action={() => {}}
            btnText="Add Client"
        />
    </View>
  )
}

export default AddClient