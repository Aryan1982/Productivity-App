import './App.css'
import { useState } from 'react';
import {DragDropContext, Droppable,Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
import removeicon from "./assets/removeicon.png"
import addicon from "./assets/addicon.png"

const item = {
  id: v4(),
  name:"Clean the house"
}

const item2 = {
  id: v4(),
  name:"Clean the car"
}

function App(){
  const[text,setText]=useState("")
  const[progess,setProgress]=useState(0)
  const[todos,setTodos]=useState(0)
  const[completed,setCompleted]=useState(1)
  const [state, setState] = useState({
    "todo":{
      title:"Todo",
      items:[]
    },
    "progress":{
      title:"In Progress",
      items:[]
    },
    "done":{
      title:"Completed",
      items:[{id: '6fae72bc-104e-411f-8ecd-7630ea36fbdc', name: 'Clean room'}]
    }
  })
  console.log(state)
  


  const handleDragEnd=({destination, source})=>{
    if (!destination){
      setState(prev=>{
      prev={...prev}
      // Remove from previous irem array
      prev[source.droppableId].items.splice(source.index,1)
      setCompleted(state.done.items.length)
      setTodos(state.todo.items.length)
      return prev
    })
    }

    if(destination.index === source.index && destination.droppableId === source.droppableId){
      return
    }

    const itemCopy = {...state[source.droppableId].items[source.index]}
    setState(prev=>{
      prev={...prev}
      // Remove from previous irem array
      prev[source.droppableId].items.splice(source.index,1)

      //Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
    setTodos(state.todo.items.length+state.progress.items.length)
    setCompleted(state.done.items.length)
    setProgress(state.progress.items.length)
  }
const addItem = ()=>{
  setTodos(state.todo.items.length+1)
  setState(prev=>{
    return{
      ...prev,
      todo:{
        title:"Todo",
        items:[
        {
          id:v4(),
          name: text
        },
        ...prev.todo.items
        ]
        
      }}
  })
}

  return(
        <div className="App">
        <div className="inputbox">
        <input type="text" value={text} placeholder="Add Todo" onChange={(e)=>setText(e.target.value)}/>
        <button className="addbtn" onClick={addItem}><img className="addicon"src={addicon}/></button>
        </div>
        <div className="container">
            <DragDropContext onDragEnd={handleDragEnd}>
               {_.map(state, (data, key) => {
                return(
                  <div key={key} className={"column"}>
                    <h3>{data.title}</h3>
                    <Droppable droppableId={key}>
                      {(provided)=>{
                          return(
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={"droppable-col"}
                              >
                                  {data.items.map((el,index)=>{
                                    return(
                                        <Draggable key={el.key} index={index} draggableId={el.id}>
                                            {(provided)=>{
                                              return(
                                                <div
                                                  className={"item"}
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                >
                                                  {el.name}
                                                
                                                </div>
                                                );
                                            }}
                                        </Draggable>
                                      );
                                  })}
                                  {provided.placeholder}
                              </div>
                            );
                      }}
                    </Droppable>
                  </div>
                  );
              })}
            </DragDropContext>
        </div>
        <div className="status">
          <div>
            <h1>In progress</h1>
            <h2>{progess}/{todos}</h2>
          </div>
          <div>
            <h1>Completed</h1>
            <h2>{completed}</h2>
          </div>
        </div>
        </div>
    );
}
export default App;

  // <button className="removebtn" onClick={removeItem}><img className="removeicon"src={removeicon}/></button>