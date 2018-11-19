<template>
<div class="container">
  <div class="card mb-4 w-80">
        <button type="button" class="close" data-dismiss="modal" @click="$emit('back-to-list')" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="col-md-11 m-3">
          <h2>{{currentArticle.title}}</h2>
          <h5>by {{currentArticle.author.name}}</h5>
            <div class="card-img-bottom h-100">
            <img src="#" title="currentArticle-image"/>
          </div>
          <p class="card-content">
          {{currentArticle.body}}
          </p>
          <p>{{currentArticle.date}}</p>
          tags: 
          <span v-for="tag in currentArticle.tags">
            {{tag}}
        </span>
        <hr>
        <div id="commentBox">
          <h5><strong>Comments:</strong></h5>
          <div class="card" v-for="comment in currentArticle.comments" :key="comment._id">
            <h4>{{comment.user}}</h4>
            <p>{{comment.body}}</p>
            <div class="btn btn-info btn-sm" :id=comment._id v-if="comment.email==loggedIn.email" @click="deleteComment"> delete </div>

          </div>
        <div class="mt-4">
          <p v-if="!loggedIn.status">
            Please login to post a comment
          </p>
          <div v-else>
            <textarea v-model='txtinput' rows="4" cols="50" placeholder="post a comment..">
            </textarea>
            <br>
            <button @click='createComment'> Submit </button>
          </div>
        </div>
      </div>
    </div>  
  </div>
</div>
  
</template>
<style>

</style>
<script>
  export default{
    name:'One',
    props:['currentArticle','loggedIn'],
    data(){
      return {
        txtinput:''
      }
    },
    created(){

    },
    methods:{
      deleteComment() {
        let commentId=event.target.id
        let articleId=this.currentArticle._id;
        let options = {
                method:'delete',
                url:`http://35.197.172.114:3001/comments/${commentId}`,
                headers:{token : localStorage.getItem('token')},
                data: {
                  articleId: articleId,
                  commentId: commentId
                }
            };
        axios(options)
        .then(article => {
          this.$emit('view-article', this.currentArticle._id);
        })
        .catch(err => {
          console.log(err.response)
        });
      },
      createComment() {
        let articleId=this.currentArticle._id;
        let options = {
                method:'post',
                url:'http://35.197.172.114:3001/comments',
                headers:{token : localStorage.getItem('token')},
                data: {
                  comment: this.txtinput,
                  articleId: articleId
                }
            };
        axios(options)
        .then(article => {
          this.$emit('view-article', this.currentArticle._id);
        })
        .catch(err => {
          console.log(err)
        });
      }      
    }
  }
</script>