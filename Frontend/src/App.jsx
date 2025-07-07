import { useState, useEffect } from 'react'
import axios from 'axios';




function App() {
  const [status, setStatus] = useState(null);

  useEffect(()=>{
    axios.get(" http://localhost:3000/api/status")
    .then(res =>{
      setStatus(res.data.outcome);
    })
    .catch(err=>{
      console.log("error fetching the data from the server");
    });
  },[])

  return (
    <>
      <h1>Status: {status == "win"? "win": "lost"}</h1>
    </>
  )
}

export default App
