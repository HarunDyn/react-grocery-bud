import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
function List({ items, deleteItem, editItem }) {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        console.log(item);
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="button-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteItem(id, title)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
