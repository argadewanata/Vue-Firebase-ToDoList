<template>
    <button class = "btn-back" @click="$router.go(-1)">Back</button> 
    <section class = "create-todo">
        <h1>Edit Task</h1>

        <form id="new-todo-form" @submit.prevent="saveChanges">
            <h4>Write your task below</h4>
            <input 
                type="text" 
                name="content" 
                id="content" 
                placeholder="A sample task"
                v-model="input_content" 
            />
            <h4>Create a category</h4>
            <form @submit.prevent="addNewCategory">
                <input 
                    type="text" 
                    name="content" 
                    id="content"
                    v-model="input_category" 
                    placeholder="A sample category" />
                <button class = "btn-addcat" type="submit">Add Category</button>
            </form>
            <div class = "categories" v-for="(category,id) in input_categories" :key="id" >
                {{ category }}
                <button class = "btn-deletecat" @click="deleteCategory(category)">Delete</button>
            </div>
            <input type="submit" value="Save Changes"/>
        </form>
    </section>
</template>

<script>
    import {initializeApp} from 'firebase/app';
    import {getFirestore,doc,getDoc,updateDoc} from 'firebase/firestore';

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
        named:"ToDOList",
        data(){
            return {     
                input_content: '',
                input_category: '',
                input_categories:[]
            }
        },
        mounted(){
            this.load()
        },
        methods:{
            async load(){
                try {
                    const id = this.$route.params.id;
                    const querySnapshot = await getDoc(doc(db, "todos",id));
                    this.input_content = querySnapshot.data().content;
                    this.input_category = querySnapshot.data().category;
                    this.input_categories = querySnapshot.data().categories;
                }
                catch (err){
                    console.log(err.message);
                }
		    },
            addNewCategory() {
                if (this.input_category == "") return;
                this.input_categories.push(this.input_category);
                this.input_category = "";
            },
            deleteCategory(index) {
                this.input_categories.splice(index, 1);
            },
            async saveChanges(){
                try {
                    const id = this.$route.params.id;
                    await updateDoc(doc(db, "todos",id), {
                        content: this.input_content,
                        categories: this.input_categories,
                    });
                }
                catch (err){
                    console.log(err.message);
                }
            },
        }
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

.btn-back{
    display: block;
    width: 10%;
    font-size: 1.125rem;
    padding: 1rem 1.5rem;
    color: #FFF;
    background-color: #2a9d8f;
    border-radius: 0.5rem;
    box-shadow: var(--personal-glow);
    cursor: pointer;
    transition: 0.2s ease-in-out;
    margin: 20px;
}

.btn-back:hover{
    color:#fff;
    background: #264653;
}
.btn-addcat{
    margin: auto;
    width: 10%;
    align-items: center;
    border-radius: 50%;
    padding: 20px;
    color: #FFF;
    background-color: #219ebc;
    box-shadow: var(--personal-glow);
    cursor: pointer;
    transition: 0.2s ease-in-out;
    margin: 10px;
}

.categories{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
    color: #FFF;
    background-color: gray;
    font-size: 30 px;
}

.btn-deletecat{
    margin: auto;
    width: 10%;
    align-items: center;
    padding: 20px;
    color: #FFF;
    background-color: red;
    box-shadow: var(--personal-glow);
    cursor: pointer;
    transition: 0.2s ease-in-out;
    margin: 10px;
}
</style>