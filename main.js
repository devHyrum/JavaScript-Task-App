document.getElementById('formTask').addEventListener('submit', saveTask); //Llamanto al boton 'submit' del formulario

/*CREAR UNA TAREA*/
function saveTask(e) {
  let title = document.getElementById('title').value; //Primera caja(input)
  let description = document.getElementById('description').value; //Segunda caja(input)
  console.log(description)

  let task = { // objeto con llave y valor 
    title, // title: title
    description // description: description
  };
//                leer↓ 
  if(localStorage.getItem('tasks') === null) { //Si no hay nada en el localStorage...
    let tasks = []; // Array sin nada dentro
    tasks.push(task); // ...vamos a colocar dentro del array tasks los objetos de task...
    //           criar↓  nombre↓     contenido↓
    localStorage.setItem('tasks', JSON.stringify(tasks)); // ...creamos en localStorage en formato JSON.string la nueva informacion
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks')); //En caso que exista ya informaciones en localStorage...
    tasks.push(task); //... vamos a colocar dentro del array tasks los objetos de task
    localStorage.setItem('tasks', JSON.stringify(tasks)); // ...añadimos en localStorage en formato JSON.string la información
  }

  getTasks(); //Llamar a la función de crear la segunda columna con las nuevas tareas
  document.getElementById('formTask').reset(); // Cada vez que terminamos de llenar el formulario, solo se limpian las cajas
  e.preventDefault();
}

/*ELIMINAR TAREA*/
function deleteTask(title) {
  console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].title == title) { //Si la tarea es igual a la tarea, osea si existe...
      tasks.splice(i, 1);//... entonces lo eliminamos, quiero decir, el indice i y el numero 1, 
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks)); //Volvemos a solicitar la actualización
  getTasks();
}

/*CREAR LA SEGUNDA COLUMNA CON LAS NUEVAS TAREAS*/
function getTasks() { 
  let tasks = JSON.parse(localStorage.getItem('tasks')); //Vamos a leer las informaciones de localStorage
  let tasksView = document.getElementById('tasks'); //DOM del div de la segunda columna
  tasksView.innerHTML = ''; //Limpiar los datos en caso de que este limpio (wtf??)
  for(let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title; //Rescatar el primer titulo
    let description = tasks[i].description; //Rescatar la primera descripción
//  creación de divs↓
    tasksView.innerHTML += `<div class="card mb-3"> 
        <div class="card-body">
          <p>${title} - ${description}
          <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Delete</a>
          </p>
        </div>
      </div>`;
  }
}

getTasks();
