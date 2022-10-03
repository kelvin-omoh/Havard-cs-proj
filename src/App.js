import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import {useState} from 'react';
import './App.css';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
function App() {
 const[search,setSearch]=useState('') 

  const [items,setItems]=useState(JSON.parse(localStorage.getItem("shoppinglist")))

const setAndSaveitems=(newItems)=>{
  setItems(newItems)
  localStorage.setItem("shoppinglist",JSON.stringify(newItems))
}

const [newItem,setNewItem]=useState('')
const additem = (item)=>{
  //checking if its empty
const id = items.length ? items[items.length - 1].id + 1 : 1;
const myNewItem={id,item,checked:false};
const listItems=[...items,myNewItem];
setAndSaveitems(listItems)
}

const handleClick = (id)=>{
  console.log(`key:${id}`);
  
  const listItems = items.map((item)=>(
    item.id===id ? {...item,checked:!item.checked}:item
    
  ));
  setAndSaveitems(listItems)
}


const handleDelete= (id)=>{
     console.log(`Delete:${id}`)
     const listItems=items.filter((item)=> item.id!==id);
     setAndSaveitems(listItems)
}

const handleSubmit=(e)=>{
  e.preventDefault()
  if(!newItem) return;
  
  console.log(newItem);
   //add item
   additem(newItem);
   setNewItem("");
}

  return (
    <div className="App">
      <Header title="Groceries List" />
     
      <AddItem
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit }
      />

       <SearchItem
      search={search}
      setSearch={setSearch}
      />

      <Content
       items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase( )))} 
        handleClick={handleClick}
         handleDelete={handleDelete} />
      <Footer length = {items.length}  />
    </div>
  );
}

export default App;
