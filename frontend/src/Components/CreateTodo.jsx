import { useState } from "react";


export function CreateTodo(){

    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");

    return <div>

        {/* onchange is not an wffective way to change titlw state it get re rendered again and again */}

        <input id="title" type = "text" placeholder="title" onChange = { function(e){
               const value = e.target.value;
               setTitle(value);

           }}></input><br/>

        <input id = "description" type = "text" placeholder = "description" onChange = {function(e){
             
               const value = e.target.value;
               setDescription(value);
        

          }}></input><br/>

        <button onClick={() => {

            {/* using axios:

                 axios.post("https://localhost:3000/todos",{

                   title:title,
                   description: description

                })
            */}

            // when we POST to backend we'll use this syntax

            fetch("http://localhost:3000/todos",{

                method: "POST",

                body: JSON.stringify({
                    title:title,
                    description: description
                    //optimal way limits re renders:
                    // title: document.getElementById("title").value,
                    // description: document.getElementById("description").value
                }),

                header:{
                    "content-type":"application/json"
                }

            }).then(async function(res){

                 const json = await res.json();
                 alert("Todo Added");

            })

        }}>Add a Todo</button>

    </div>
}