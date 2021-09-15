import React, { useState, useEffect } from 'react'


export default function PrintaSwapi(props){

    let i = 0;   
    const [sida, setSida] = useState(false)
    const [chars, setChars] = useState([])
    const [chars2, setChars2] = useState(["hästen", "osten"])
    const [movie, setMovie] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function XfetchPokemons(){
          setChars([]);
          setLoading(true);
          setChars2([""]);
        }
        XfetchPokemons();          
      },[sida]);


    function PrintaMovies(props) {        

        return (
            <div>
               {props.starwars.map((p, index) => <div>
                <p >{p.title}: {p.release_date} <button onClick={e => {setSida(true); setMovie(p.title) ; i=index; p.characters.map((p, i) => {chars.push(p); /*</p>console.log(p)*/})}}>info</button></p>
                </div>)}
            </div>
        )
    }


    function PrintaInfo(props) {      

           const test = [];            
           const prom = [];           

    /* Promise.all([
            fetch(chars[0]).then(value => value.json()),
            fetch(chars[1]).then(value => value.json()),
            fetch(chars[2]).then(value => value.json())
        ]).then( (values) => {
             prom.push(values[0].name);
             prom.push(values[1].name);
             prom.push(values[2].name);
             prom.sort();    
             setLoading(false);             
             setChars2(prom);             
             });
             
             --->>>   Promise.all([...prom3])
             --->>>   Promise.all([
            fetch(chars[0]).then(value => value.json()),
            fetch(chars[1]).then(value => value.json()),
            fetch(chars[2]).then(value => value.json())
            ])

            --->>>    const prom4 = [fetch(chars[0]).then(value => value.json()),fetch(chars[1]).then(value => value.json())]
             
             */

           // const promise1 = Promise.resolve(fetch(chars[0]).then(value => value.json()));
            //const promise2 = Promise.resolve(fetch(chars[1]).then(value => value.json()));

            //const promise3 = Promise.resolve(fetch(chars[2]).then(value => value.json()));           

            /* 
             // console.log(testQ[0]);

            const testT = [promise1, promise2, promise3];     
            ELLER om man pushar in manuellt : test.push(promise1) osv..       

                Promise.all([
                  ...testT    
                ]).then( (values) => {
                    
                    console.log(values.length)
                   for(let i = 0; i < values.length; i++) {
                       prom.push(values[i].name);
                   }
            */

                   
           chars.map(e => {test.push(Promise.resolve(fetch(e).then(value => value.json())))})  
           
          test.push(Promise.resolve(fetch(chars[0]).then(value => value.json())))              
                 
      
         // chars.forEach(function callbackfn(element, index, chars) {test.push(Promise.resolve(fetch(element).then(value => value.json()))) })

         


                Promise.all([
                  ...test
                ]).then( (values) => {
                    
                 for(let i = 0; i < values.length; i++) {
                       prom.push(values[i].name);
                   }                                   
                    prom.sort();  
                    const distinct = [...new Set(prom)];
                    setChars2(distinct);        
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

  
