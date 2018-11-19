<template>
  <div class="container home">
    <!--nav bar-->

    <Navbar  @register="handleReg($event)" @toggleView="toggleView" :register="register" @login="handleLogin($event)" @logout="handleLogout" :loggedIn="loggedIn" />
    <!--all articles tab-->
    <div v-if="!showMyArticles" class="container home">
      <div class="row main-page">
        <!-- Post Content Column -->
        <div class="col-md-9 container-left">
          <List v-if="allArticles" :articles="articles" @view-article="viewArticle($event)"/>
          <One  v-else @view-article="viewArticle($event)" @back-to-list="allArticles=true" :currentArticle="currentArticle" :loggedIn='loggedIn'/>
        </div>
          <!-- Sidebar Widgets Column -->
        <div class="col-md-3">
          <!-- Search Widget -->
          <div class="card my-4">
            <h5 class="card-header">Search</h5>
            <div class="card-body">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for...">
                <span class="input-group-btn">
                  <button class="btn btn-secondary" type="button">Go!</button>
                </span>
              </div>
            </div>
          </div>

          <!-- Tags Widget -->
          <div class="card my-4">
            <h5 class="card-header">Article Tags</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6" v-for="tag in tags">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#">{{tag}}</a>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6">
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Widget -->
          <div class="card my-4">
            <h5 class="card-header">Chat</h5>
            <div class="card-body">
            </div>
          </div>

      </div>
        <div class="col col-sm-4">
        </div>
      </div>
    </div>
    <MyArticles v-else @createArticle="createArticle($event)" @deleteArticle="deleteArticle($event)" :loggedIn="loggedIn" :myArticles="myArticles" />

    <!--my articles tab-->
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  import Navbar from '@/components/Navbar.vue'
  import One from '@/components/One.vue'
  import MyArticles from './MyArticles.vue'
  export default {
    name:'home',
    data() {
      return {
        allArticles: true,
        currentArticle: {},
        articles:[],
        showMyArticles: false,
        myArticles:[],
        tags:[],
        loggedIn:{
          name: '',
          email:'',
          msg:'',
          status: false
        },
        register:{
          msg:''
        }
      }
    },
    created() {
      this.getAll();
    },
    methods: {
      getMyArticles(articles) {
        let self = this;
        self.myArticles=[];
        articles.forEach(article => {
          if(article.author.email == self.loggedIn.email) self.myArticles.push(article); 
        });
      },
      getAll() {
        let self = this;
        let options = {
                  method:'get',
                  url:'http://localhost:3000/articles',
              };
        axios(options)
        .then(articles => {
          let articleList = articles.data.articles;
          self.articles=[];
          articleList.forEach(article => self.articles.push(article));
          self.getMyArticles(articleList);
          self.getTags();
        })
        .catch(err => {
          console.log(err)
        });
      },
      toggleView() {
        this.showMyArticles = !this.showMyArticles
      },
      createArticle(article) {
        console.log('creating')
        let self=this;
        let token= localStorage.getItem('token');
        let options={
          url:`http://localhost:3000/articles`,
          method:'post',
          headers: {'token': token },
          data: article
        }
        axios(options)
        .then(result => {
          console.log(result.data.success)
          if(result.data.success) {
            self.getAll()
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
      deleteArticle(articleId) {
        // console.log(articleId);
        let self=this;
        let token= localStorage.getItem('token');
        let options={
          url:`http://localhost:3000/articles/${articleId}`,
          method:'delete',
          headers: {'token': token } 
        }
        axios(options)
        .then(result => {
          if(result.data.success) {
            self.getAll()
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
      viewArticle(articleId) {
        let options={
        url:`http://localhost:3000/articles/${articleId}`,
        method:'get',
        }
        axios(options)
        .then(result => {
          if(result.data.success) {
            this.currentArticle = result.data.article;
            this.allArticles = false;
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
      handleReg(newUser) {
        let options={
          url:'http://localhost:3000/users/register',
          method:'post',
          data: newUser
        }
        axios(options)
        .then(result => {
            localStorage.setItem('token', result.data.token);
            this.loggedIn.status= true;
            this.loggedIn.email= newUser.email;
            this.register.msg= 'successfully registered.';
        })
        .catch(err => {
          this.register.msg = err.response.data.msg
        })

      },
      handleLogin(userLogin) {
        let options={
          url:'http://localhost:3000/users/login',
          method:'post',
          data: userLogin
        }
        axios(options)
        .then(result => {
          if(result.data.success) {
            localStorage.setItem('token', result.data.token);
            this.loggedIn.status=true;
            this.loggedIn.name=result.data.user.name;
            this.loggedIn.msg=`successfully logged in.`;
            this.loggedIn.email=result.data.user.email;
            this.getAll();
          }
          else this.loggedIn.msg=result.data.msg; 
        })
        .catch(err => {
          this.loggedIn.msg = err.response.data.msg;

        })
      },
      handleLogout() {
        localStorage.clear();
        this.loggedIn.status = false;
        this.loggedIn.email=''
        this.loggedIn.msg='' 

      },
      getTags() {
        let tags=[];
        this.articles.forEach(article => Array.prototype.push.apply(tags, article.tags));
        let uniquetags=[];
        tags.forEach(tag => {
          if(uniquetags.indexOf(tag) == -1) uniquetags.push(tag);
        });
        uniquetags.forEach(tag => this.tags.push(tag));
      }
      
    },
    components: {
      List, Navbar, One, MyArticles
    }
  }
</script>
<style>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .post {
    font-size: 13px;
    text-align: center;

  }
  .container {
    max-width: 1700px;
  }
  .container-left{
    overflow: scroll;
    max-height: 90vh;
  }
  .navbar{
    background-color: rgba(10, 0, 100, 0.4)
  }
  .navbar-brand {
    color:grey;
  }
  .main-page {
    margin-top:100px;
  }
  
</style>
