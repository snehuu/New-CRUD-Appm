import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  // Fetch items
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("https://new-crud-backend-t2ha.onrender.com/api/items");
    setItems(res.data);
  };

  const createItem = async () => {
    if (!form.name) return;
    await axios.post("https://new-crud-backend-t2ha.onrender.com/api/items", form);
    setForm({ name: "", description: "" });
    fetchItems();
  };

  const updateItem = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      await axios.put(`https://new-crud-backend-t2ha.onrender.com/api/items/${id}`, { name: newName });
      fetchItems();
    }
  };

  const deleteItem = async (id) => {
    await axios.delete(`https://new-crud-backend-t2ha.onrender.com/api/items/${id}`);
    fetchItems();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MERN CRUD App</h1>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button onClick={createItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <b>{item.name}</b> - {item.description}{" "}
            <button onClick={() => updateItem(item._id)}>Edit</button>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

