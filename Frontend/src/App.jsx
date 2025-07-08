import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [status, setStatus] = useState(null);
  const [sendOutcome, setSendOutcome] = useState("Select")
  const [clickBgColors, setClickBgColors] = useState(Array(9).fill('black'));

  useEffect(() => {
    axios.get("http://localhost:3000/api/status")
      .then(res => {
        setStatus(res.data.outcome);
      })
      .catch(err => {
        console.log("error fetching the data from the server");
      });
  }, [])

  const handleClick = (index) => {
    setClickBgColors(prevColors => {
      const newColors = [...prevColors];
      newColors[index] = status === 'win' ? 'green' : 'red';
      return newColors;
    });
  }

  const toggelStatus=()=>{
    if(sendOutcome === "Select"){
      alert("please select a status");
    }
    else{
    axios.post('http://localhost:3000/api/status', {outcome: sendOutcome})
    .then(res =>{
      // alert("updated to "+sendOutcome);
      setStatus(res.data.gameState.outcome);
    })
    .catch(err =>{
      alert("error "+ err);
    })
  }
  }

  return (
    <>
      <div className="main-container">
        <div className="secondary-container">
          <h1>3X3 Mine</h1>
          <div className="button-grids">
            {[...Array(9)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                style={{ backgroundColor: clickBgColors[index] }}
              >
                {/* {index + 1} */}
              </button>
            ))}
          </div>
          <p>Status: <b> {status === "win" ? <span style={{color: 'green'}}>Wining</span> : <span style={{color: 'red'}}>Losing</span>} </b></p>
        </div>
      </div>
      <div className="admin">
        <h1>ADMIN</h1>
        <select value={sendOutcome} onChange={e => setSendOutcome(e.target.value)} name="status" id="stats">
          <option value="Select">Select</option>
          <option value="win">Win</option>
          <option value="lose">lose</option>
        </select>
            <br />
        <button
        onClick={toggelStatus}
         className='admin-button'>Change</button>
      </div>
    </>
  )
}

export default App;
