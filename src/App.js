import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content1 from './Content1';
import Footer from './Footer';
import { useState, useEffect } from 'react';



function App() {
  const API_URL = 'http://localhost:3500/items';
  
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('did not recieve expected data');
        const listItems = await response.json();
        // console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000)
     
}, []) 


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
        <main className='main'>
          {isLoading && <p>Loading Items...</p>}
          {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
          {!fetchError &&  !isLoading && <Content1 
          items={items.filter(item => ((item.item).toLowerCase()).includes
            (search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          />}
        </main>
        <Footer length={items.length} />
      </div>
    );
  }

export default App;

