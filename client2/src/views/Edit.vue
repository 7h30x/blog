<template>
  <div class="newPost">
    <h1>Create new Post</h1>
    <form>
      {{title}}<br>
      <input type="text" name="title"><br>
      {{content}}<br>
      <input type="text" name="content"><br>
      {{tags}}<br>
      <input type="text" name="tags"> <br>
      <br>
      <input type="submit">
    </form>
  </div>
</template>
<style>
  .newPost {
    border: solid 1px #1f1f1f;
    background-color: #f1f1f1;
    margin: 0px 20px;
    padding: 80px 0px;
  }
</style>
