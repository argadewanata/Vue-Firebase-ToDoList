<template>
    <div class="main-menu">
        <h1>Main Menu</h1>
        <div class = "ToDoOptions">
            <RouterLink to="/ToDoList">ToDoList</RouterLink>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
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
 .ToDoOptions{
    text-align: center;
    margin: auto;
    width: 50%;
    border: 3px solid green;
    padding: 10px;

 }
</style>