import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content1 from './Content1';
import Footer from './Footer';
import { useState, useEffect } from 'react';



function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem
  ('shoppingList')) || []);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
}, [items]) 


  const setAndSaveItems = (newItems) => {
    setItems(newItems);
   
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [ ...items, myNewItem];
    setAndSaveItems(listItems);

  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item,
    checked: !item.checked } : item);
    setAndSaveItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    // console.log(newItem)
    addItem(newItem);
    setNewItem('');
    
  }

    return (
      <div className="App">
        <Header title="Grocery List" />
        <AddItem 
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItem 
        search={search}
        setSearch={setSearch}
        />
        <Content1 
        items={items.filter(item => ((item.item).toLowerCase()).includes
          (search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        />
        <Footer length={items.length} />
      </div>
    );
  }

export default App;

