import React, { useEffect, useState } from 'react'
import './Translator.css'

function Translator() {
    const [userText,setUserText] = useState("")
    const[btnStatus,setBtnStatus]= useState(false)
    const [result,setResult] = useState("")

    const fetchUrl = "https://api.funtranslations.com/translate/valyrian.json" + "?" + "text=" + userText;

    function handleChange(event){
        setUserText(event.target.value)
    }

    useEffect(()=>{
        if(btnStatus){
            fetch(fetchUrl)
            .then(res => {
                if(!res.ok){
                    throw Error("Servers are busy right now,please try again in few minutes");
                } 
                return res.json()
            })
            .then(data => setResult(data.contents.translated))
            
            .catch(Error => {
                setResult(Error.message)
            })
            setBtnStatus(false)
        }
    },[btnStatus])

    function handleClick(){
        setBtnStatus(true)
    }

  return (
    <div className='translator'>
        <h1 className="heading">Valyrian Translator</h1>
        <p class="description">Welcome to game of thrones Valyrian Translator</p>
        <textarea onChange={handleChange} type="text"  />
        <button onClick={handleClick} className="translate">Translate</button>
        <div id="disclaimer">Your Valyrian Translation is: </div>
        <div className='outputDiv'>{result}</div>
    </div>
  )
}

export default Translator
