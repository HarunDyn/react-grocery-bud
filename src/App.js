import React, { useEffect, useState } from "react";
import List from "./List.js";
import Alert from "./Alert";

const getItemToLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getItemToLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setAlert({ show: true, msg: "please enter a value", type: "danger" });
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      setAlert({ show: true, msg: `${name} added..`, type: "success" });
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setAlert({ show: true, msg: `${name} added..`, type: "success" });
      setList([...list, newItem]);
      setName("");
    }
  };

  const deleteItem = (id, title) => {
    const newList = list.filter((item) => item.id !== id);
    setAlert({ show: true, msg: `${title} deleted..`, type: "danger" });
    setList(newList);
  };

  const clearAllItems = () => {
    if (list.length > 0) {
      setAlert({ show: true, msg: `All items deleted..`, type: "danger" });
      setList([]);
    }
  };

  const editItem = (id) => {
    const willEditItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(willEditItem.title);
  };

  useEffect(() => {
    if (alert.show === true) {
      const setTime = setTimeout(() => {
        setAlert({ show: false, msg: "", type: "" });
      }, 1000);
      return () => clearTimeout(setTime);
    }
  }, [alert]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} />}
          <p className="header">grocery bud</p>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="e.g. eggs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
        <div className="grocery-container">
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearAllItems}>
            Clear Items
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
