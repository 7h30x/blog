
<template>
  <div>
    <h2 class="text-white mb-4">Article List</h2>
    <div class="card mb-4 w-80" v-for="article in articles">
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
           <span v-for="tag in articles[0].tags">
              {{tag}}
          </span>  
         </div>
         <div class="col-md-4">
           <div class="card-img-bottom h-100">
             <img src="#" title="article-image"></img>
           </div>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'List',
    props:['articles'],
    data: function() {
      return {
       
      }
    },
 
  }
</script>