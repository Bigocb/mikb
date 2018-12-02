<template>
      <b-container class="container">
        <b-row class="row">
          <b-col v-if="userPrefs.selectedLeft === 'frequent'">
            <b-card class="dash">
              <h3>Frequent Reas</h3>
            </b-card>
            <draggable v-model="myArray">
    <transition-group>
            <div  v-for="post in postsjava"  v-bind:key="post.id">
              <p >
                <router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
                  <b-card class="dash">
                    <div >
                      {{post.title}}
                    </div>
                  </b-card>
                </router-link>           
              </p>
            </div>
    </transition-group>
    </draggable>

          </b-col>
          <b-col v-if="userPrefs.selectedLeft === 'approvals'">
             <b-card class="dash">
            <h3>Need Approval</h3>
             </b-card>
            <div v-for="post in postsapproved"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col>

                    <b-col v-if="userPrefs.selectedLeft === 'todo'">
             <b-card class="dash">
            <h3>To Dos</h3>
             </b-card>
            <div v-for="post in poststodo"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col>
                    <b-col v-if="userPrefs.selectedLeft === 'toread'">
             <b-card class="dash">
            <h3>To Read</h3>
             </b-card>
            <div v-for="post in poststoread"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col>
                    <b-col v-if="userPrefs.selectedLeft === 'archive'">
             <b-card class="dash">
            <h3>Archived</h3>
             </b-card>
            <div v-for="post in postsarchive"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col>
          <b-col v-if="userPrefs.selectedLeft === 'recent'">
             <b-card class="dash">
              <h3>Recent Posts</h3>
                </b-card>
              <div v-for="post in postsnew"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
              </div>
          </b-col>

                   <b-col v-if="userPrefs.selectedRightMid === 'todo'">
             <b-card class="dash">
            <h3>To Dos</h3>
             </b-card>
            <div v-for="post in poststodo"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col>
                    <b-col v-if="userPrefs.selectedRightMid === 'toread'">
             <b-card class="dash">
            <h3>To Read</h3>
             </b-card>
            <div v-for="post in poststoread"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col>
                    <b-col v-if="userPrefs.selectedRightMid === 'archive'">
             <b-card class="dash">
            <h3>Archived</h3>
             </b-card>
            <div v-for="post in postsarchive"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col>

          <b-col v-if="userPrefs.selectedRightMid === 'frequent'">
            <b-card class="dash">
            <h3>Frequent Reads</h3>
             </b-card>
              <div v-for="post in postsjava"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
              </div>
          </b-col>
          <b-col v-if="userPrefs.selectedRightMid === 'recent'">
              <b-card class="dash">
              <h3>Recent Posts</h3>
                </b-card>
            <div v-for="post in postsnew"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col> 
          <b-col v-if="userPrefs.selectedRightMid === 'approvals'">
            <b-card class="dash">
            <h3>Need Approval</h3>
             </b-card>
              <div v-for="post in postsapproved"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
              </div>
          </b-col>
          <b-col v-if="userPrefs.selectedLeftMid === 'frequent'">
            <b-card class="dash">
             <h3>Frequent Reads</h3>
             </b-card>
              <div v-for="post in postsapproved"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
              </div>
          </b-col>

               <b-col v-if="userPrefs.selectedLeftMid === 'todo'">
             <b-card class="dash">
            <h3>To Dos</h3>
             </b-card>
            <div v-for="post in poststodo"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col>
                    <b-col v-if="userPrefs.selectedLeftMid === 'toread'">
             <b-card class="dash">
            <h3>To Read</h3>
             </b-card>
            <div v-for="post in poststoread"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col>
                    <b-col v-if="userPrefs.selectedLeftMid === 'archive'">
             <b-card class="dash">
            <h3>Archived</h3>
             </b-card>
            <div v-for="post in postsarchive"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col>


          <b-col v-if="userPrefs.selectedLeftMid === 'approvals'">
            <b-card class="dash">
            <h3>Need Approval</h3>
             </b-card>
              <div v-for="post in postsapproved"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
              </div>
          </b-col>
                    <b-col v-if="userPrefs.selectedLeftMid === 'recent'">
            <b-card class="dash">
            <h3>Recent Posts</h3>
             </b-card>
              <div v-for="post in postsnew"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
              </div>
          </b-col>

     <b-col v-if="userPrefs.selectedRight === 'todo'">
             <b-card class="dash">
            <h3>To Dos</h3>
             </b-card>
            <div v-for="post in poststodo"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col>
                    <b-col v-if="userPrefs.selectedRight === 'toread'">
             <b-card class="dash">
            <h3>To Read</h3>
             </b-card>
            <div v-for="post in poststoread"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col>
                    <b-col v-if="userPrefs.selectedRight === 'archive'">
             <b-card class="dash">
            <h3>Archived</h3>
             </b-card>
            <div v-for="post in postsarchive"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
            </div>
          </b-col>


<b-col v-if="userPrefs.selectedRight === 'frequent'">
            <b-card class="dash">
             <h3>Frequent Reads</h3>
             </b-card>
              <div v-for="post in postsapproved"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
              </div>
          </b-col>
          <b-col v-if="userPrefs.selectedRight === 'approvals'">
            <b-card class="dash">
            <h3>Need Approval</h3>
             </b-card>
              <div v-for="post in postsapproved"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
              </div>
          </b-col>
                    <b-col v-if="userPrefs.selectedRight === 'recent'">
            <b-card class="dash">
            <h3>Recent Posts</h3>
             </b-card>
              <div v-for="post in postsnew"  v-bind:key="post.id">
 <p ><router-link  v-on:click.native="updateReadCount(post.id)" :to="'/detail/' + post.id">
               <b-card class="dash">
                <div >
                {{post.title}}
            </div>
           </b-card>
           </router-link>           </p>
              </div>
          </b-col>

          
        </b-row>

        <div class="dash">
        <div class="navbar navbar-expand-lg navbar-dark bg-primary" >
      <a id="popoverButton-sync" > <img src="../../assets/png/wrench-2x.png"></a>

           <b-popover :show.sync="show" target="popoverButton-sync" title="Add Tags">

             <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion1 variant="info">Left</b-btn>
        </b-card-header>
        <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-form-group>
              <b-form-radio-group id="radios1" v-model="userPrefs.selectedLeft" :options="options" name="radioOpenions1">
              </b-form-radio-group>
            </b-form-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion2 variant="info">Right Mid</b-btn>
        </b-card-header>
        <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-form-group>
              <b-form-radio-group id="radios2" v-model="userPrefs.selectedLeftMid" :options="options" name="radioOpenions2">
              </b-form-radio-group>
            </b-form-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion3 variant="info">Left Mid</b-btn>
        </b-card-header>
        <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-form-group>
              <b-form-radio-group id="radios3" v-model="userPrefs.selectedRightMid" :options="options" name="radioOpenions3">
              </b-form-radio-group>
            </b-form-group>
          </b-card-body>
        </b-collapse>
         </b-card>
              <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion4 variant="info">Right </b-btn>
        </b-card-header>
                <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-form-group>
              <b-form-radio-group id="radios4" v-model="userPrefs.selectedRight" :options="options" name="radioOpenions3">
              </b-form-radio-group>
            </b-form-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      
      
      <a href="#"  @click.prevent="setPrefs()"> <img src="../../assets/png/file-2x.png"></a>
                  </b-popover>
      </div>
      </div>

      <b-modal id="modal1" title="Bootstrap-Vue">
      

    </b-modal> 
  </b-container>
</template>
<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>
<style lang="css">
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
  @import 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/a11y-dark.min.css';


img {
    vertical-align: middle;
}

.img-responsive {
    display: block;
    height: auto;
    max-width: 100%;
}

.img-rounded {
    border-radius: 3px;
}

.img-thumbnail {
    background-color: #fff;
    border: 1px solid #ededf0;
    border-radius: 3px;
    display: inline-block;
    height: auto;
    line-height: 1.428571429;
    max-width: 100%;
    moz-transition: all .2s ease-in-out;
    o-transition: all .2s ease-in-out;
    padding: 2px;
    transition: all .2s ease-in-out;
    webkit-transition: all .2s ease-in-out;
}

.img-circle {
    border-radius: 50%;
}

.timeline-centered {
    position: relative;
    margin-bottom: 30px;
}

    .timeline-centered:before, .timeline-centered:after {
        content: " ";
        display: table;
    }

    .timeline-centered:after {
        clear: both;
    }

    .timeline-centered:before, .timeline-centered:after {
        content: " ";
        display: table;
    }

    .timeline-centered:after {
        clear: both;
    }

    .timeline-centered:before {
        content: '';
        position: absolute;
        display: block;
        width: 4px;
        background: #f5f5f6;
        /*left: 50%;*/
        top: 20px;
        bottom: 20px;
        margin-left: 30px;
    }

    .timeline-centered .timeline-entry {
        position: relative;
        /*width: 50%;
        float: right;*/
        margin-top: 5px;
        margin-left: 30px;
        margin-bottom: 10px;
        clear: both;
    }

    .dash{
      margin-top: 20px;
    }

        .timeline-centered .timeline-entry:before, .timeline-centered .timeline-entry:after {
            content: " ";
            display: table;
        }

        .timeline-centered .timeline-entry:after {
            clear: both;
        }

        .timeline-centered .timeline-entry:before, .timeline-centered .timeline-entry:after {
            content: " ";
            display: table;
        }

        .timeline-centered .timeline-entry:after {
            clear: both;
        }

        .timeline-centered .timeline-entry.begin {
            margin-bottom: 0;
        }

        .timeline-centered .timeline-entry.left-aligned {
            float: left;
        }

            .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner {
                margin-left: 0;
                margin-right: -18px;
            }

                .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-time {
                    left: auto;
                    right: -100px;
                    text-align: left;
                }

                .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-icon {
                    float: right;
                }

                .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-label {
                    margin-left: 0;
                    margin-right: 70px;
                }

                    .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-label:after {
                        left: auto;
                        right: 0;
                        margin-left: 0;
                        margin-right: -9px;
                        -moz-transform: rotate(180deg);
                        -o-transform: rotate(180deg);
                        -webkit-transform: rotate(180deg);
                        -ms-transform: rotate(180deg);
                        transform: rotate(180deg);
                    }

        .timeline-centered .timeline-entry .timeline-entry-inner {
            position: relative;
            margin-left: -20px;
        }

            .timeline-centered .timeline-entry .timeline-entry-inner:before, .timeline-centered .timeline-entry .timeline-entry-inner:after {
                content: " ";
                display: table;
            }

            .timeline-centered .timeline-entry .timeline-entry-inner:after {
                clear: both;
            }

            .timeline-centered .timeline-entry .timeline-entry-inner:before, .timeline-centered .timeline-entry .timeline-entry-inner:after {
                content: " ";
                display: table;
            }

            .timeline-centered .timeline-entry .timeline-entry-inner:after {
                clear: both;
            }

            .timeline-centered .timeline-entry .timeline-entry-inner .timeline-time {
                position: absolute;
                left: -100px;
                text-align: right;
                padding: 10px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-time > span {
                    display: block;
                }

                    .timeline-centered .timeline-entry .timeline-entry-inner .timeline-time > span:first-child {
                        font-size: 15px;
                        font-weight: bold;
                    }

                    .timeline-centered .timeline-entry .timeline-entry-inner .timeline-time > span:last-child {
                        font-size: 12px;
                    }

            .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon {
                background: #fff;
                color: #737881;
                display: block;
                width: 40px;
                height: 40px;
                -webkit-background-clip: padding-box;
                -moz-background-clip: padding;
                background-clip: padding-box;
                -webkit-border-radius: 20px;
                -moz-border-radius: 20px;
                border-radius: 20px;
                text-align: center;
                -moz-box-shadow: 0 0 0 5px #f5f5f6;
                -webkit-box-shadow: 0 0 0 5px #f5f5f6;
                box-shadow: 0 0 0 5px #f5f5f6;
                line-height: 40px;
                font-size: 15px;
                float: left;
            }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-primary {
                    background-color: #303641;
                    color: #fff;
                }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-secondary {
                    background-color: #ee4749;
                    color: #fff;
                }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-success {
                    background-color: #00a651;
                    color: #fff;
                }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-info {
                    background-color: #21a9e1;
                    color: #fff;
                }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-warning {
                    background-color: #fad839;
                    color: #fff;
                }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-danger {
                    background-color: #cc2424;
                    color: #fff;
                }

            .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label {
                position: relative;
                background: #f5f5f6;
                padding: 1em;
                margin-left: 60px;
                -webkit-background-clip: padding-box;
                -moz-background-clip: padding;
                background-clip: padding-box;
                -webkit-border-radius: 3px;
                -moz-border-radius: 3px;
                border-radius: 3px;
            }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label:after {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 9px 9px 9px 0;
                    border-color: transparent #f5f5f6 transparent transparent;
                    left: 0;
                    top: 10px;
                    margin-left: -9px;
                }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2, .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label p {
                    color: #737881;
                    font-family: "Noto Sans",sans-serif;
                    font-size: 12px;
                    margin: 0;
                    line-height: 1.428571429;
                }

                    .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label p + p {
                        margin-top: 15px;
                    }

                .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 {
                    font-size: 16px;
                    margin-bottom: 10px;
                }

                    .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 a {
                        color: #303641;
                    }

                    .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 span {
                        -webkit-opacity: .6;
                        -moz-opacity: .6;
                        opacity: .6;
                        -ms-filter: alpha(opacity=60);
                        filter: alpha(opacity=60);
                    }

  #app {
    width: 95%;
    margin: 0 auto;
  }
  
.long {
  width: 25%;
  float: left;
}

.short {
  width: 65%;
  float: right;
}

  .VuePagination {
    text-align: center;
  }

  .list-group-item {
    color:black
  }
  
  .vue-title {
    text-align: center;
    margin-bottom: 10px;
  }
  
  .vue-pagination-ad {
    text-align: center;
  }
  
  .glyphicon.glyphicon-eye-open {
    width: 16px;
    display: block;
    margin: 0 auto;
  }
  
  th:nth-child(3) {
    text-align: center;
  }
  
  .VueTables__child-row-toggler {
    width: 16px;
    height: 16px;
    line-height: 16px;
    display: block;
    margin: auto;
    text-align: center;
  }
  
  .VueTables__child-row-toggler--closed::before {
    content: "+";
  }
  
  .VueTables__child-row-toggler--open::before {
    content: "-";
  }
  
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg)
    }
  }
  
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg)
    }
  }
  
  .icon {
    position: relative;
    display: inline-block;
    width: 25px;
    height: 25px;
    overflow: hidden;
    fill: currentColor
  }
  
  .icon__cnt {
    width: 100%;
    height: 100%;
    background: inherit;
    fill: inherit;
    pointer-events: none;
    transform: translateX(0);
    -ms-transform: translate(.5px, -.3px)
  }
  
  .icon--m {
    width: 50px;
    height: 50px
  }
  
  .icon--l {
    width: 100px;
    height: 100px
  }
  
  .icon--xl {
    width: 150px;
    height: 150px
  }
  
  .icon--xxl {
    width: 200px;
    height: 200px
  }
  
  .icon__spinner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
  }
  
  .icon--ei-spinner .icon__spinner,
  .icon--ei-spinner-2 .icon__spinner {
    -webkit-animation: spin 1s steps(12)infinite;
    animation: spin 1s steps(12)infinite
  }
  
  .icon--ei-spinner-3 .icon__spinner {
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite
  }
  
  .icon--ei-sc-facebook {
    fill: #3b5998
  }
  
  .icon--ei-sc-github {
    fill: #333
  }
  
  .icon--ei-sc-google-plus {
    fill: #dd4b39
  }
  
  .icon--ei-sc-instagram {
    fill: #3f729b
  }
  
  .icon--ei-sc-linkedin {
    fill: #0976b4
  }
  
  .icon--ei-sc-odnoklassniki {
    fill: #ed812b
  }
  
  .icon--ei-sc-skype {
    fill: #00aff0
  }
  
  .icon--ei-sc-soundcloud {
    fill: #f80
  }
  
  .icon--ei-sc-tumblr {
    fill: #35465c
  }
  
  .icon--ei-sc-twitter {
    fill: #55acee
  }
  
  .icon--ei-sc-vimeo {
    fill: #1ab7ea
  }
  
  .icon--ei-sc-vk {
    fill: #45668e
  }
  
  .icon--ei-sc-youtube {
    fill: #e52d27
  }
  
  .icon--ei-sc-pinterest {
    fill: #bd081c
  }
  
  .icon--ei-sc-telegram {
    fill: #08c
  }
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/evil-icons/x.y.z/evil-icons.min.js">
  
</script>

<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js">
  
</script>

<script>
  hljs.initHighlightingOnLoad();
</script>

<!-- TODO: Allow removal of existing tags, parse tags to individual objects -->
<!-- TODO: Close edit on clicking of minus button or when switching to another note-->
<!-- FIXME: Okta works in dev but not prod, if i REMOVE IT DEV doesn't work-->
<script>
  import api from '@/api'
  import VueHighlightJS from 'vue-highlightjs'
  import hljs from 'highlight.js'
  import draggable from 'vuedraggable'
  import apiOkta from '@/apiOkta'
  export default {
     components: {
            draggable,
        },
    data() {
  
      return {
        sortKey: '',
        columns: ['more','title','category','delete'],
        reverse: false,
        search: '',
        show: false,
        showPlaces: false,
        loading: false,
        postsjava: [],
        postsapproved: [],
        postsnew: [],
        poststoread: [],
        poststodo: [],
        postsarchive: [],
        allTags: {},
        userPrefs: {},
      options: [
         {text: 'None', value: 'None'},
        {text: 'Frequemt Reads', value: 'frequent'},
        {text: 'Recent Posts', value: 'recent'},
        {text: 'Approvals', value: 'approvals'},
        {text: 'To Dos', value: 'todo'},
        {text: 'To Read', value: 'toread'},
        {text: 'Archive', value: 'archive'}
      ],
      optionsRightTop: [
         {text: 'None', value: 'None'},
        {text: 'Frequemt Reads', value: 'frequent'},
        {text: 'Recent Posts', value: 'recent'},
              {text: 'Approvals', value: 'approvals'},
        {text: 'To Dos', value: 'todo'},
        {text: 'To Read', value: 'toread'},
        {text: 'Archive', value: 'archive'}
      ],
      optionsRightBotton: [
         {text: 'None', value: 'None'},
        {text: 'Frequemt Reads', value: 'frequent'},
        {text: 'Recent Posts', value: 'recent'},
                {text: 'Approvals', value: 'approvals'},
        {text: 'To Dos', value: 'todo'},
        {text: 'To Read', value: 'toread'},
        {text: 'Archive', value: 'archive'}
      ],
      optionsRightBotton: [
         {text: 'None', value: 'None'},
        {text: 'Frequemt Reads', value: 'frequent'},
        {text: 'Recent Posts', value: 'recent'},
            {text: 'Approvals', value: 'approvals'},
        {text: 'To Dos', value: 'todo'},
        {text: 'To Read', value: 'toread'},
        {text: 'Archive', value: 'archive'}
      ],
        model: {},
        family: {},
        approved: {
          approved: "1"
        },
        tagcat: {
          tagid: "2"
        },
        selectedPlace: {}
      }
    },
    async created() {
      this.refreshPosts()
      this.temp = await apiOkta.getUser()
      this.family = await api.getFamily(this.temp.profile.email)
      this.model = Object.assign({}, this.family, this.approved)
      this.allTags = await api.getTags()
    },
    methods: {
      sortBy: function(key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      },
      async refreshPosts() {
        this.temp = await apiOkta.getUser()
        this.family = await api.getFamily(this.temp.profile.email)
        console.log(this.tagcat)
        this.postsjava = await api.getMostReadPosts(this.family.familyid)
        this.postsapproved = await api.getApprovalPosts(this.family.familyid)
        this.postsnew = await api.getRecentPosts(this.family.familyid)
        this.userPrefs = await api.getPrefs(this.family.familyid)
        this.poststodo = await api.getToDos(this.family.familyid)
        this.poststoread = await api.getToRead(this.family.familyid)
        this.postsarchive = await api.getArchived(this.family.familyid)
      },
      updateSelected(selectedItem) {
        this.selectedPlace = selectedItem;
        this.showPlaces = true;
      },
        async updateReadCount(id) {
        await api.updateReadCount(id)
        console.log(id)
      },
          splitJoin(theText){
        if(theText) {
          return theText.split(',');
        } else {
          return null;
        }
      	
      },
      updateTags(tag) {
        this.model = Object.assign({}, tag);
      },
      async populatePostToEdit(props) {
        this.model = Object.assign({}, props)
        this.showPlaces = true;
      },
      async getAllTags() {
        this.tags = await api.getTags()
      },
      async setPrefs() {
        console.log(this.userPrefs)
        console.log(this.family.familyid)
        await api.setPrefs(this.family.familyid, this.userPrefs)
        this.show = false
      },
      async savePost() {
        if (this.model.id) {
          console.log(this.model.tags);
          await api.updatePost(this.model.id, this.model)
          if (this.model.tags) {
            console.log(this.model.tags);
            if (this.model.tags < 100) {
              await api.updateTags(this.model.id, this.model)
            }
          }
        } else {
          //TODO: Fix tags for new posts
          await api.createPost(this.model)
          //   if (this.model.tags) {
          //   console.log(this.model.tags);
          //   if (this.model.tags < 100) {
          //     await api.updateTags(this.model.id, this.model)
          //   }
          // }
        }
        this.model = Object.assign({}, this.family, this.approved)
        await this.refreshPosts()
      },
      async deletePost(id) {
        if (confirm('Are you sure you want to delete this post?')) {
          // if we are editing a post we deleted, remove it from the form
          await api.deletePost(id)
          await this.refreshPosts()
          this.model = Object.assign({}, this.family, this.approved)
        }
      }
    }
  }
</script>
  }
</script>