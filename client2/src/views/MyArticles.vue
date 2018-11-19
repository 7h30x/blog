
<template>
<div class="container mt-2">
  <!-- article modal -->
  <div class="modal fade" id="articleModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" >New Article</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <form @submit.prevent="$emit('createArticle',newArticle)">
          Title:<br>
          <input type="text" v-model="newArticle.title"><br>
          Content:<br>
          <textarea v-model="newArticle.body" placeholder=" write your post here..." rows="10" cols="50">
          </textarea> <br>
          Tags: <br>
          <input v-model="newArticle.tags" placeholder=" tag1 tag2 ..." type="text" name="tags"> <br>
          <br>
          <input  @click="hideModals" type="submit">
        </form>
        </div>
      </div>
    </div>
  </div>
  <br> <br>
  <h2 class=" mt-5">My Articles</h2>
  <div v-if="loggedIn.status==false" class="row">
    <em>
      <h3>Please log in to create, read, and update your articles</h3>
    </em>
  </div>
  <div v-else class="container">
    <span class="btn btn-primary btn-sm" data-toggle="modal" data-target="#articleModal">create Article</span>
    <div class="card mb-4 w-80" v-for="article in myArticles" :key="article._id">
        <div class="row h-75">
          <div class="col-md-7 m-3">
            <h4>{{article.title}}</h4>
            <h5>by {{article.author.name}}</h5>
            <p class="card-content">
            {{article.body.slice(0,200)}}...
            </p>
            <a href="#" @click.prevent="$emit('view-article',article._id)">
              read more
            </a>
            <p>{{article.date}}</p>
            tags: 
          <span v-for="tag in myArticles.tags">
              {{tag}}
          </span>  
          </div>
          <div class="col-md-4">
            <span class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#articleModal"> edit</span>
            <span @click="$emit('deleteArticle', article._id)" class="btn btn-danger btn-sm"> delete</span>
            <div class="card-img-bottom h-100">
              <img src="#" title="article-image"/>
            </div>
          </div>
      </div>
    </div>
  </div>
  
</div>

</template>
<script>
  export default {
    name: 'MyArticles',
    props:['myArticles', 'loggedIn'],
    data() {
      return{
        newArticle:{
          title:'',
          body:'',
          tags:''
        }
      }
      
    },
    methods:{
      hideModals() {
          setTimeout(function() {
            $('#articleModal').modal('hide');
          }, 1500)
      }
    }
  }
</script>
<style>
  .newArticle {
    border: solid 1px #1f1f1f;
    background-color: #f1f1f1;
    margin: 0px 20px;
    padding: 80px 0px;
  }
</style>
