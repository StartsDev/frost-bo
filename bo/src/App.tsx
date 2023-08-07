import Avatar from "./components/avatar/Avatar"
import Button from "./components/button/Button"
import Input from "./components/input/Input"

function App() {

  return (
    <>
      <div>
        <Button
          text="Test"
          action={() => {}}
        />
        <Input
          placeholder="example"
          type="text"
          onChange={() => {}}
        />
        <Avatar />
      </div>
    </>
  )
}

export default App
