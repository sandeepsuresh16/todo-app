import {useState,useEffect} from "react"
import './App.css';

const getLocalItems=()=>{
  let list= localStorage.getItem('lists')
  if(list){
    return JSON.parse(localStorage.getItem('lists'))
  }
}

function App() {
  const [inputData,setInputData]=useState("")
  const [items, setitems] = useState(getLocalItems())

  const addItem=()=>{
    if(!inputData){

    }else{
      setitems([...items,{title:inputData,id:Date.now(),done:false}])
    }
    
  }

  const deleteItem=(id)=>{
    const updatedItem = items.filter((elem)=>{
      return elem.id!==id
    })
    setitems(updatedItem)
  }

  const taskDone=(id)=>{
    let newList=[...items]
    console.log(newList)
    
    const element = newList.findIndex((elem)=>elem.id===id)
    newList[element]={...newList[element],done:true}

    setitems(newList)
  }

  useEffect(() => {
    localStorage.setItem('lists',JSON.stringify(items))
    
  }, [items])   


  
  return (
   <div className='container pt-5 pb-5 '>
     <div className='row justify-content-center text-center'>
       <div className='col-12 mb-4'>
         <h2>To-Do List</h2>
       </div>
       <div className='col-5'>
         <input className='me-2' type="text" placeholder='Write Todo'onChange={(e)=>setInputData(e.target.value)} value={inputData}/>
         <i className="fas fa-plus" style={{cursor:'pointer'}} title='Add Item' onClick={addItem}></i>
       </div>
     </div>
     <div className="row justify-content-center text-center" >
       
       {
         items.map((item,index)=>{
           return(
            <div key={item.id} className="row pt-2 pb-2 mb-1 justify-content-center">
              <div className=" col-5 showitems">
                  {!item.done?<p>{item.title} <span><i className="fas fa-check-circle tick" title="completed" onClick={()=>taskDone(item.id)}></i><i className="fas fa-trash" title="delete item" onClick={()=>deleteItem(item.id)}></i></span></p> :
                  <p><del>{item.title}</del><span><i className="fas fa-check-circle tick" title="completed"></i><i className="fas fa-trash" title="delete item" onClick={()=>deleteItem(item.id)}></i></span></p>

                  }
                   
                  
               
              
              </div>
              
            </div>
           )
           
           
         })
       }
     </div>
   </div>
  );
}

export default App;
