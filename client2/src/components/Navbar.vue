 <!-- Navigation -->
  <template>
    <div class="nav-container">
      <!-- Reg Modal -->
      <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" >Register As A New User</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="registration"  @submit.prevent="$emit('register', regData)">
                Name: <input v-model="regData.name" type="text" placeholder="name"> <br><br>
                Email: <input v-model="regData.email" type="text" placeholder="email"> <br><br>
                Password: <input v-model="regData.password" type="password" placeholder="password"> <br><br>
                <input   class="btn btn-primary" type="submit"/>
              </form>
              <span>{{register.msg}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Login Modal -->
      <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" >Login</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="clearFields">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
               <form name="loginForm" @submit.prevent="$emit('login', loginData)" >
                Email: <input v-model="loginData.email" type="text" placeholder="email"> <br><br>
                Password: <input v-model="loginData.password" type="password" placeholder="password"> <br><br>
                <input @click=hideModals class=" btn btn-primary" type="submit" />
              </form>
            <span>{{loggedIn.msg}}</span>
            </div>
          </div>
        </div>
      </div>

       <!-- Logout Modal -->
      <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" >Logout</h5>
              <button @click="$emit('logout')" type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
               You have successfully logged out.
            </div>
          </div>
        </div>
      </div>

    <nav class="navbar navbar-expand-lg navbar-dark  fixed-top">
      <div class="container" >
            <img class="ml-2" src="../../assets/Flow-Logo.png"/>
           
            <span class="ml-4" v-show="loggedIn.status"> Welcome, {{loggedIn.email}}</span>

        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link"  href="#" @click.prevent="$emit('toggleView')"> Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="$emit('toggleView')" title="login to see your blog posts">My Articles</a>
            </li>
            <li class="nav-item active" data-toggle="modal" data-target="#loginModal" v-show="!loggedIn.status">
              <a class="nav-link" href="#">Login
              </a>
            </li>
            <li class="nav-item active" data-toggle="modal" data-target="#logoutModal" v-show="loggedIn.status">
              <a class="nav-link" href="#">Logout
              </a>
            </li>
            <!-- modal toggler-->
            <li class="nav-item active" data-toggle="modal" data-target="#registerModal">
              <a class="nav-link" href="#">Register
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>  
<script>
    export default {
      name: 'Navbar',
      props:['loggedIn','register'],
      data() {
        return {
          loginData: {
            email:'',
            password:''
          },
          regData:{
            name:'',
            email:'',
            password:''
          },
        }
      },
      methods:{
        clearFields() {
          this.loginData.password='';
        },
        hideModals() {
          setTimeout(function() {
            $('#loginModal').modal('hide');
          }, 1500)
        }
      },
      watch: {
        loggedIn: function() {setTimeout(()=>{
          this.loggedIn.msg='';
          }, 2500)
        }
      }
    }
  </script>
   
