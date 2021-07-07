import { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";


// get localstorage
const getLocalStorage = ()=>{
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}

// main function

const App = () => {
  const [text, setText] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({msg: '', type: '' });


// main-submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      list.length<5?showAlert('plz input  task...', 'danger'):showAlert('Thats enough for today xD', 'danger');
      ;

    }
    else if (edit) {
      
       setList(list.map((item)=>{
         if(item.id===editId){
           return {...item,text:text}
         }
         return item;
       }));
       setText('');
       setEdit(false);
       setEditId(null);
       showAlert('successfully edited','success')
    }
    else {

      if(list.length<5){
        const newItem = { id: new Date().getTime().toString(), text: text };
        setList([...list, newItem]);
        setText('');
        showAlert('Task Added successfully', 'success');
      }
      else{
        showAlert('Thats enough for today xD', 'danger');

      }


    }


  }

// alert portable function
  const showAlert = (msg = '', type = '') => {
    setAlert({msg: msg, type: type });
  }

// alert removal list dependency
  useEffect(() => {
    const removeAlert = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => { clearTimeout(removeAlert) };
  }, [list])


//  button handlers
  const deleteHandler = (id) => {
    const newList = list.filter((item) => item.id !== id)
    setList(newList)
    showAlert('Task Deleted ', 'danger');

  }
  const editHandler = (id) => {
    const thatItem = list.find((item) => item.id === id);
    setText(thatItem.text);
    setEdit(true);
    setEditId(thatItem.id);

  }

  const handleClear = () => {
    setList([]);
    showAlert('List Cleared ! ', 'danger');

  }

// local storage set

  useEffect(() => {
      localStorage.setItem('list',JSON.stringify(list))

  }, [list])

// main return
  return (
    <div className='container'>
      <h1 className='main-title'>Todo List</h1>

      {/* input part */}
      <form  className='form' onSubmit={handleSubmit}>
        <Alert {...alert} />
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='input' placeholder='   Todo Tasks ...' />
        <button type='submit' className='submit-btn'>Add</button>
      </form>


      {/* lists part */}
      {list.length > 0 && <div className="list-all">
        <List list={list} deleteHandler={deleteHandler} editHandler={editHandler} />
        <button type='button' className='clear-btn' onClick={handleClear}>Clear All</button>
      </div>}

    </div>
  );
};

export default App;

