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
      </div>
    </>
  )
}

export default App
