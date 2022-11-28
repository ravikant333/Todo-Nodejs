

const getdate = () => {
  const date = new Date();
  const _year = date.getFullYear();
  const _month = date.getMonth() + 1;
  const _date = date.getDate();

  document.getElementById("day").innerHTML = `${_date}, ${_month}, ${_year}`;
};
getdate();

const handleclick = () => {
  document.getElementById("form").classList.toggle("show-form");
};

const createNew = async (e) => {
  const form = document.getElementById("form");
  const title = form.elements[0].value;
  const discription = form.elements[1].value;
  console.log(title);
  console.log(discription);
  const todo = {
    title,
    discription,
    completed: false,
    favourite: false,
  };
  try {
    console.log(todo);
    await axios.post("/api/v1/tasks", todo);
    showAll();
  } catch (err) {
    console.log(err);
  }
};

const updatefav =async(_id) => {
 try{
  const todo=await axios.get( `/api/v1/tasks/${_id}`);
  await axios.patch(`/api/v1/tasks/${_id}`, {
    favourite: !todo.data.task.favourite
  })
  showAll()
 }
 catch(err)
 {
  console.log(err)
 }

};

const updatedone = async(_id) => {
  try{
    const todo=await axios.get( `/api/v1/tasks/${_id}`);
    await axios.patch(`/api/v1/tasks/${_id}`, {
      completed: !todo.data.task.completed
    })
    showAll()
   }
   catch(err)
   {
    console.log(err)
   }

};

const showAll = async (e) => {
  try {
    const todoarr = await axios.get("/api/v1/tasks");
    const data = todoarr.data.todo;
    let html = "";
    console.log(data)
    const done='done'
    const complete='complete'
    const fav='favourite'
    data.reverse()
   await data.map((todo) => {
      html += ` <div class="list-item" >
            <div class="item-left">
            <span class="checkbox"><button onclick="updatedone( '${todo._id}' )" ><i class="fa-solid fa-circle-check ${todo.completed&&complete}"></i></button></span>
             <span class="todo-data ${todo.completed&&done}">
              <h3>${todo.title}</h3>
              <p>${todo.discription}</p>
             </span>
             </div>
             <span class="star"> <button onclick="updatefav('${todo._id}' ) "><i class="fa-solid fa-star ${todo.favourite&&fav}"></i></button></span>
            </div> `;
      return todo;
    });

    const elm = document.getElementById("todo-list");
    elm.innerHTML = html;
  } catch (err) {
    console.log(err);
  }
};

showAll();

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
