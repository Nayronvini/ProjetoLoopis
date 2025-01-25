//Declara os elementos
const toDoInput = document.getElementById("todoInput");
const addToDoButton = document.getElementById("addTodoBtn");
const toDoList = document.getElementById("todoList");

//Função para adicionar elementos
function addToDo(){
    // Guarda a frase inserida pelo usuário e confere se realmente há uma frase
    const texto = toDoInput.value.trim();
    if(texto === "") return;

    // Cria uma nova tarefa e adiciona o texto da tarefa escrito na caixa de texto
    const li = document.createElement("li");
    li.classList.add("todo-item");

    // Criando o span para o texto da tarefa
    const tarefa = document.createElement("span");
    tarefa.textContent = texto;

    // Criando o container para os botões
    const buttonContainer = document.createElement("div");

    // Criando botão de editar
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", editToDo);

    // Criando botão de excluir
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", deleteToDo);

    // Adiciona os botões ao container
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    // Adiciona os elementos à li
    li.appendChild(tarefa);
    li.appendChild(buttonContainer);

    // Adiciona a nova tarefa a ul e limpa caixa de texto
    toDoList.appendChild(li);
    toDoInput.value = "";
}

//Função para excluir um elemento
function deleteToDo(event){
    // Acha o li (tarefa) a partir do botão clicado e remove
    const tarefaLixo = event.target.parentElement.parentElement;
    tarefaLixo.remove();
    saveToLocalStorage();
}

//Função para editar um elemento
function editToDo(event){
    // Seleciona o texto da tarefa para edição
    const tarefaEditada = event.target.parentElement.parentElement.querySelector("span");
    const novoTexto = prompt("Edite sua tarefa: ", tarefaEditada.textContent);

    // Atualiza o texto da tarefa se a edição for válida
    if(novoTexto !== null && novoTexto.trim() !== ""){
        tarefaEditada.textContent = novoTexto.trim();
    }
    saveToLocalStorage();
}

//Função para salvar a lista no localStorage
function saveToLocalStorage() {
    // Cria um array vazio para armazenar as tarefas
    const todos = [];
    const todoItems = document.querySelectorAll(".todo-item");

    // Percorre os itens da lista e armazena o texto de cada tarefa no array
    todoItems.forEach(item => {
        const text = item.querySelector("span").textContent;
        todos.push(text);
    });

    // Salva o array de tarefas no localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
}

//Função para carregar a lista do localStorage
function loadFromLocalStorage() {
    // Recupera as tarefas do localStorage
    const todos = JSON.parse(localStorage.getItem("todos"));

    // Se houver tarefas no localStorage, cria os elementos da lista
    if (todos) {
        todos.forEach(todo => {
            const li = document.createElement("li");
            li.classList.add("todo-item");

            const span = document.createElement("span");
            span.textContent = todo;

            const btnContainer = document.createElement("div");

            // Criando botão de editar
            const editBtn = document.createElement("button");
            editBtn.textContent = "Editar";
            editBtn.classList.add("edit-btn");
            editBtn.addEventListener("click", editToDo);

            // Criando botão de excluir
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Excluir";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", deleteToDo);

            // Adiciona os botões ao container
            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(deleteBtn);

            // Adiciona a tarefa e os botões à li
            li.appendChild(span);
            li.appendChild(btnContainer);

            // Adiciona a tarefa à lista
            toDoList.appendChild(li);
        });
    }
}

//Função chamada quando a página é carregada
window.onload = function() {
    // Carrega as tarefas salvas no localStorage
    loadFromLocalStorage();
};

//Evento para adicionar o elemento ao clicar no botão "adicionar"
addToDoButton.addEventListener("click", addToDo);
//Evento para adicionar o elemento ao pressionar "Enter"
document.getElementById("todoInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("addTodoBtn").click();
    }
});