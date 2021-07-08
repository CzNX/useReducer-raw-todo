import { useState, useReducer } from "react";
import Item from './Item'

const reducer = (list, action) => {
  if(action.type==='add'){
    return [...list,{id:new Date().getTime().toString(),text:action.payload.text,completed:false}]
  }
  if(action.type==='toggle'){
    return list.map(i=>{
      if(i.id===action.payload.id){
        return {...i,completed:!i.completed};
      }
      return i;

    })
  }
  if(action.type==='delete'){
    return list.filter(i=>i.id!==action.payload.id)
  }

  if(action.type==='edit'){
    const thatItem = list.find(i=>i.id===action.payload.id)
    action.payload.settext(thatItem.text);
    action.payload.setIsEdit(true);
    action.payload.setEid(action.payload.id);

    return list;
    
  }

  if(action.type==='editTask'){
    return list.map(i=>{
      if(i.id===action.payload.id)
      {
        return {...i,text:action.payload.text};


      }
      return i;
    })
  }

  return list

}


const App = () => {
  const [list, dispatch] = useReducer(reducer, []);
  const [text, settext] = useState('');
  const [eid, setEid] = useState(null);
  const [isEdit, setIsEdit] = useState(false);


const handleSubmit =(e)=>{
  e.preventDefault();
  if(isEdit){
    dispatch({type:'editTask', payload:{text:text,id:eid}})
    setEid(null);
    setIsEdit(false);
    settext('');
  }
  else if (text){
  dispatch({type:'add', payload:{text:text}})

  settext('');
  }


}

  // main return
  return (
    <div className='container'>

    <form onSubmit={handleSubmit}>
    <input type="text" value={text} onChange={(e)=>settext(e.target.value)}/>
    </form>
 


    {list.map((item)=>{
      return(
        <Item key={item.id} {...item} dispatch={dispatch} settext={settext} setIsEdit={setIsEdit} setEid={setEid}/>
      )
    })}

    </div>


  );
};

export default App;

