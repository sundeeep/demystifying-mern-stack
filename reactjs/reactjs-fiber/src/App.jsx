
function App(){

  const sendHTTPRequest = async() => {
    try {
      const URL = "http://localhost:8000/testing";
      const options = {
        method: "POST",
        body: JSON.stringify({
          name: "Sundeeep Dasari",
          age: 25
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }

      const response = await fetch(URL, options);
      console.log(response)
      if(!response.ok) {
        throw new Error("Invalid API Endpoint!")
      }
      const jsonData = await response.json();
      console.log(jsonData)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
    <button onClick={sendHTTPRequest}>Send Request</button>
    </>
  )
}

export default App;