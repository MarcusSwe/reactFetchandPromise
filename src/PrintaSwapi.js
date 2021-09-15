import React, { useState, useEffect } from 'react'

export default function PrintaSwapi(props){

    const [sida, setSida] = useState(false)
    const [chars, setChars] = useState([])
    const [chars2, setChars2] = useState(["hästen", "osten"])
    const [movie, setMovie] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function XshoW(){
          setChars([]);
          setLoading(true);
          setChars2([""]);
        }
        XshoW();          
      },[sida]);


    function PrintaMovies(props) { 
        return (
            <div>
               {props.starwars.map((p, index) => <div>
                <p >{p.title}: {p.release_date} <button onClick={e => {setSida(true); setMovie(p.title) ; p.characters.map((p, index) => {chars.push(p)})}}>info</button></p>
                </div>)}
            </div>
        )
    }

    function PrintaInfo(props) {  
         const test = [];       
         const prom = [];       
                   
         chars.map(e => {test.push(Promise.resolve(fetch(e).then(value => value.json())))})             
         test.push(Promise.resolve(fetch(chars[0]).then(value => value.json())))    

         Promise.all([...test]).then( (values) => {            
         for(let i = 0; i < values.length; i++) {prom.push(values[i].name);}      
            prom.pop();                             
            prom.sort();              
            setChars2(prom);        
            setLoading(false);                        
     });         

    return (
        <div> 
        <h1>{movie}</h1>
        <button onClick={e => {setSida(false)}}>gå tillbaka</button>                    
        {chars2.map((p) => <p>{p}</p>)}
        </div>
    )            
}    

   function ChooseToPrint(){            
      if(!sida) return PrintaMovies(props);
      else return PrintaInfo(props);
    }

   function chooseToPrint2(){
     if(loading && sida){
        return <h3> ---- loading ---- </h3>
     } else return <div></div>            
  }

return (
    <div>
      {chooseToPrint2()}  
      {ChooseToPrint(props)}
    </div>
)       
}