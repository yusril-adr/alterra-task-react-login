const Todo = ({
  id,
  title,
  completed,
  onClickItem,
  onDeleteItem,
}) => (
  <li className={completed ? 'done todo-item' : 'todo-item'} data-key={id}>
    <input onChange={onClickItem} id={id} type="checkbox" />
    <label htmlFor={id} className="tick js-tick" />
    <span>
      {`${title} - ID: ${id}`}
    </span>
    <button type="button" onClick={onDeleteItem} className="delete-todo js-delete-todo">
      <svg>
        <use href="#delete-icon" />
      </svg>
    </button>
  </li>
);

export default Todo;
