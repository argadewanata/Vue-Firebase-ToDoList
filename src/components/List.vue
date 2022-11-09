<template>
	<button class="btn-create" @click="$router.push('CreateToDos')">Create New</button>

    <section class = "todo-list">
        <div class="List">
            <h1>To-do List</h1>
			<section class = "create-todo">
				<input type="text" class="category_search" v-model="category_search" placeholder="Search Category..." />
			</section>
			<h2>Filtered Todo List</h2>
            <div v-for="(todo,id) in filteredTodos" :key="id" :class="`todo-item ${todo.done && 'done'}`">
                <label>
                    <input type="checkbox" v-model="todo.done" />
                    <span :class="`bubble ${
                        todo.category == 'business' 
                            ? 'general' 
                            : 'general'
                    }`"></span>
				</label>
                <div class = "todo-content">
                    {{todo.content}}
					<div class = "todo-categories" v-for="(category,id) in todo.categories" :key="id">
						{{category}}
					</div>
                </div>  
                <div class="actions">
					<button class = "btn-edit" @click="$router.push({name: 'EditToDos', params: {id: todo.id}})">Edit</button>
                    <button class ="delete" @click="removeData(todo.id)">Delete</button>
                </div>
            </div>

			<h2>All Todo List</h2>
            <div v-for="(todo,id) in todos" :key="id" :class="`todo-item ${todo.done && 'done'}`">
                <label>
                    <input type="checkbox" v-model="todo.done" />
                    <span :class="`bubble ${
                        todo.category == 'business' 
                            ? 'general' 
                            : 'general'
                    }`"></span>
				</label>
                <div class = "todo-content">
                    {{todo.content}}
					<div class = "todo-categories" v-for="(category,id) in todo.categories" :key="id">
						{{category}}
					</div>
                </div>  
                <div class="actions">
					<button class = "btn-edit" @click="$router.push({name: 'EditToDos', params: {id: todo.id}})">Edit</button>
                    <button class ="delete" @click="removeData(todo.id)">Delete</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {initializeApp} from 'firebase/app';
    import {getFirestore,collection,doc,getDocs,deleteDoc} from 'firebase/firestore';
	

    const firebaseConfig = {
        apiKey: "AIzaSyANC5KsxuCjnOMHRtVPy-LQhc-PgDt0Llg",
        authDomain: "pweb-todo.firebaseapp.com",
        projectId: "pweb-todo",
        storageBucket: "pweb-todo.appspot.com",
        messagingSenderId: "410037530220",
        appId: "1:410037530220:web:c0e6884f4a599b1b8cb249"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
	

    export default {
        named:"ToDoList",
        data(){
			
            return {
				category_search : '',
                todos: [],                
            }
        },
        mounted(){
            this.load()
			
        },
        methods:{
            async load(){
                try {
                    const querySnapshot = await getDocs(collection(db, "todos"));
                    this.todos = [];
                    querySnapshot.forEach((doc) => {
						this.todos.push({ id: doc.id, ...doc.data() });
                    })
                }
                catch (err){
                    console.log(err.message);
                }
            },
            async removeData(id){
                try{
                    const docRef = await deleteDoc(doc(db, "todos", id));
					toastr.success('Data Deleted');
                    this.load();
                }
                catch(err){
                    console.log("Error deleting document:",err);
                }
            },
        },
		computed:{
			filteredTodos(){
				this.load();
				return this.todos.filter((todo) => {
					return todo.categories.includes(this.category_search)
				})
			}
		},
    }        
</script>

<style>
:root {
    --primary: #d62828;
    --business: #3A82EE;
    --personal: var(--primary);
    --college: #F59E0B;
    --general: #6B7280;
    --sports: #10B981;
    --light: #EEE;
    --grey: #888;
    --dark: #313154;
    --danger: #ff5b57;

    --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    --business-glow: 0px 0px 4px rgba(58, 130, 238, 0.75);
    --personal-glow: 0px 0px 4px rgba(234, 64, 164, 0.75);
    --college-glow: 0px 0px 4px rgba(245, 158, 11, 0.75);
    --sports-glow: 0px 0px 4px rgba(16, 185, 129, 0.75);
    --general-glow: 0px 0px 4px rgba(107, 114, 128, 0.75);
}

.main-menu{
    background-color:#faedcd;
}

h1{
    text-align: center;
    font-size: 50px;
    color: red;
    font-weight: 700;
    margin-bottom: 0.5rem;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'montserrat', sans-serif;
    background:#fefae0
}
input:not([type="radio"]):not([type="checkbox"]), button {
	appearance: none;
	border: none;
	outline: none;
	background: none;
	cursor: initial;
}

body {
	background: var(--light);
	color: var(--dark);
}

section {
	margin-top: 2rem;
	margin-bottom: 2rem;
	padding-left: 1.5rem;
	padding-right: 1.5em;
}

h3 {
	color: var(--dark);
	font-size: 1rem;
	font-weight: 400;
	margin-bottom: 0.5rem;
}

h4 {
	color: var(--grey);
	font-size: 0.875rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
}

.greeting .title {
	display: flex;
}

.greeting .title input {
	margin-left: 0.5rem;
	flex: 1 1 0%;
	min-width: 0;
}

.greeting .title,
.greeting .title input {
	color: var(--dark);
	font-size: 1.5rem;
	font-weight: 700;
}

.create-todo input[type="text"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: var(--dark);
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1.5rem;
}

.create-todo .options {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 1rem;
	margin-bottom: 1.5rem;
}

.create-todo .options label {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	cursor: pointer;
}

input[type="radio"],
input[type="checkbox"] {
	display: none;
}

.bubble {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid var(--business);
	box-shadow: var(--business-glow);
}

.bubble.personal {
	border-color: var(--personal);
	box-shadow: var(--personal-glow);
}

.bubble.college{
    border-color: var(--college);
    box-shadow: var(--college-glow);
}

.bubble.sports{
    border-color: var(--sports);
    box-shadow: var(--sports-glow);
}

.bubble::after {
	content: "";
	display: block;
	opacity: 0;
	width: 0px;
	height: 0px;
	background-color: var(--business);
	box-shadow: var(--business-glow);
	border-radius: 50%;
	transition: 0.2s ease-in-out;
}

.bubble.personal::after {
	background-color: var(--personal);
	box-shadow: var(--personal-glow);
}

.bubble.college::after {
	background-color: var(--college);
	box-shadow: var(--college-glow);
}

.bubble.sports::after{
    background-color: var(--sports);
    box-shadow: var(--sports-glow);
}

input:checked ~ .bubble::after {
	width: 10px;
	height: 10px;
	opacity: 1;
}

.create-todo .options label div {
	color: var(--dark);
	font-size: 1.125rem;
	margin-top: 1rem;
}

.create-todo input[type="submit"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: #FFF;
	background-color: var(--primary);
	border-radius: 0.5rem;
	box-shadow: var(--personal-glow);
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.create-todo input[type="submit"]:hover {
	opacity: 0.75;
}

.todo-list .list {
	margin: 1rem 0;
} 

.todo-list .todo-item {
	display: flex;
	align-items: center;
	background-color: #FFF;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1rem;
}

.todo-item label {
	display: block;
	margin-right: 1rem;
	cursor: pointer;
}

.todo-item .todo-content {
	flex: 1 1 0%;
}

.todo-item .todo-content input {
	color: var(--dark);
	font-size: 1.125rem;
}

.todo-item .actions {
	display: flex;
	align-items: center;
}

.todo-item .actions button {
	display: block;
	padding: 0.5rem;
	border-radius: 0.25rem;
	color: #FFF;
	cursor: pointer;
	transition: 0.2s ease-in-out;
    background: #219ebc;
}

.todo-item .actions button:hover {
	opacity: 0.75;
}

.todo-item .actions .edit {
	margin-right: 0.5rem;
	background-color: #219ebc;
}

.todo-item .actions .delete {
	background-color: var(--danger);
}

.todo-item.done .todo-content input {
	text-decoration: line-through;
	color: var(--grey);
}

.todo-item .todo-content .todo-categories {
	color:lightsalmon;
}

.btn-create{
    display: block;
    width: 10%;
    font-size: 1rem;
    padding: 1rem 1.5rem;
    color: #FFF;
    background-color: #2a9d8f;
    border-radius: 0.5rem;
    box-shadow: var(--personal-glow);
    cursor: pointer;
    transition: 0.2s ease-in-out;
    margin: 20px;
}

.btn-create:hover{
    color:#fff;
    background: #264653;
}

</style>