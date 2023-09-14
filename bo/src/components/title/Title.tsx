function Title({
    title
}: { title: string }) {
  return (
    <h1
        style={{
            width: "85%",
            padding: "10px 0",
            fontSize: "1.5rem"
        }}
    >
        {title} 
    </h1>
  )
}


export default Title