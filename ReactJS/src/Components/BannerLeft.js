import React, { Component } from 'react'

class BannerLeft extends Component {
  render() {
    return (
      <div>
       
        <section id="intro" className="clearfix">
          <div className="container">

            <div className="intro-img">
              <img src="/images/intro-img.svg" alt="" className="img-fluid" />
            </div>

            <div className="intro-info">
              <h2>We provide<br /><span>solutions</span><br />for your business!</h2>
              <div>
                <a href="#manual" className="btn-get-started scrollto">Manual</a>
                <a href="#developer" className="btn-services scrollto">Developer</a>
              </div>
            </div>

          </div>
        </section>

        <main id="main">

          <section id="manual">
            <div className="container">

              <header className="section-header">
                <h3>User manual</h3>
                <p>UX is easy to use, UI is good looking</p>
              </header>

              <div className="row about-container">

                <div className="col-lg-6 content order-lg-1 order-2">

                  <div className="icon-box wow fadeInUp">
                    <div className="icon"><img src="/logo-menu.jpg" width="40" height="40"/></div>
                    <h4 className="title"><a href="">Home page</a></h4>
                    <p className="description">Contains user instructions for the user</p>
                  </div>

                  <div className="icon-box wow fadeInUp" data-wow-delay="0.2s">
                    <div className="icon"><span className="fas fa-folder" /></div>
                    <h4 className="title"><a href="">List Project</a></h4>
                    <p className="description">Contains list your project</p>
                  </div>

                  <div className="icon-box wow fadeInUp" data-wow-delay="0.4s">
                    <div className="icon"><span className="fas fa-user" /></div>
                    <h4 className="title"><a href="">User Page</a></h4>
                    <p className="description">Contains your personal information and history</p>
                  </div>

                  <div className="icon-box wow fadeInUp" data-wow-delay="0.4s">
                    <div className="icon"><span className="fas fa-sign-out-alt" /></div>
                    <h4 className="title"><a href="">Log out</a></h4>
                  </div>
                </div>

                <div className="col-lg-6 background order-lg-2 order-1 wow fadeInUp">
                  <video width="320" height="240" autoPlay loop className="video-fluid">
                    <source src="/video/menu.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              <div className="row about-extra">
                <div className="col-lg-6 wow fadeInUp">
                  <video width="320" height="240" autoPlay loop className="video-fluid">
                    <source src="/video/createproject.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="col-lg-6 wow fadeInUp pt-5 pt-lg-0">
                  <h4>Create New Project</h4>
                  <p>
                    Easily create a new project quickly
                  </p>
                </div>
              </div>

              <div className="row about-extra">
                <div className="col-lg-6 wow fadeInUp order-1 order-lg-2">
                  <video width="320" height="240" autoPlay loop className="video-fluid">
                    <source src="/video/backlog.mp4" type="video/mp4" />
                  </video>
                </div>

                <div className="col-lg-6 wow fadeInUp pt-4 pt-lg-0 order-2 order-lg-1">
                  <h4>Backlog Page</h4>
                  <p>
                    Create list issues and sprints for your project
                  </p>
                  <p>
                    Drag and drop issues into sprints 
                  </p>
                  
                </div>
                
              </div>

              <div className="row about-extra">
                <div className="col-lg-6 wow fadeInUp">
                  <video width="320" height="240" autoPlay loop className="video-fluid">
                    <source src="/video/moveissues.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="col-lg-6 wow fadeInUp pt-5 pt-lg-0">
                  <h4>Drag And Drop In Active Sprint</h4>
                  <p>
                    Easily change issues's process 
                  </p>
                </div>
              </div>

            </div>
          </section>

          <section id="services" className="section-bg">
            <div className="container">

              <header className="section-header">
                <h3>Services</h3>
                <p>Laudem latine persequeris id sed, ex fabulas delectus quo. No vel partiendo abhorreant vituperatoribus.</p>
              </header>

              <div className="row">

                <div className="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp" data-wow-duration="1.4s">
                  <div className="box">
                    <div className="icon"><i className="ion-ios-analytics-outline" style={{color: '#ff689b'}}></i></div>
                    <h4 className="title"><a href="">Lorem Ipsum</a></h4>
                    <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-5 wow bounceInUp" data-wow-duration="1.4s">
                  <div className="box">
                    <div className="icon"><i className="ion-ios-bookmarks-outline" style={{color: '#e9bf06'}}></i></div>
                    <h4 className="title"><a href="">Dolor Sitema</a></h4>
                    <p className="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp" data-wow-delay="0.1s" data-wow-duration="1.4s">
                  <div className="box">
                    <div className="icon"><i className="ion-ios-paper-outline" style={{color: '#3fcdc7'}}></i></div>
                    <h4 className="title"><a href="">Sed ut perspiciatis</a></h4>
                    <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-5 wow bounceInUp" data-wow-delay="0.1s" data-wow-duration="1.4s">
                  <div className="box">
                    <div className="icon"><i className="ion-ios-speedometer-outline" style={{color:'#41cf2e'}}></i></div>
                    <h4 className="title"><a href="">Magni Dolores</a></h4>
                    <p className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp" data-wow-delay="0.2s" data-wow-duration="1.4s">
                  <div className="box">
                    <div className="icon"><i className="ion-ios-world-outline" style={{color: '#d6ff22'}}></i></div>
                    <h4 className="title"><a href="">Nemo Enim</a></h4>
                    <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-5 wow bounceInUp" data-wow-delay="0.2s" data-wow-duration="1.4s">
                  <div className="box">
                    <div className="icon"><i className="ion-ios-clock-outline" style={{color: '#4680ff'}}></i></div>
                    <h4 className="title"><a href="">Eiusmod Tempor</a></h4>
                    <p className="description">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi</p>
                  </div>
                </div>

              </div>

            </div>
          </section>

          <section id="why-us" className="wow fadeIn">
            <div className="container">
              <header className="section-header">
                <h3>Why choose us?</h3>
                <p>Laudem latine persequeris id sed, ex fabulas delectus quo. No vel partiendo abhorreant vituperatoribus.</p>
              </header>

              <div className="row row-eq-height justify-content-center">

                <div className="col-lg-4 mb-4">
                  <div className="card wow bounceInUp">
                      <i className="fa fa-diamond"></i>
                    <div className="card-body">
                      <h5 className="card-title">Corporis dolorem</h5>
                      <p className="card-text">Deleniti optio et nisi dolorem debitis. Aliquam nobis est temporibus sunt ab inventore officiis aut voluptatibus.</p>
                      <a href="#" className="readmore">Read more </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 mb-4">
                  <div className="card wow bounceInUp">
                      <i className="fa fa-language"></i>
                    <div className="card-body">
                      <h5 className="card-title">Voluptates dolores</h5>
                      <p className="card-text">Voluptates nihil et quis omnis et eaque omnis sint aut. Ducimus dolorum aspernatur.</p>
                      <a href="#" className="readmore">Read more </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 mb-4">
                  <div className="card wow bounceInUp">
                      <i className="fa fa-object-group"></i>
                    <div className="card-body">
                      <h5 className="card-title">Eum ut aspernatur</h5>
                      <p className="card-text">Autem quod nesciunt eos ea aut amet laboriosam ab. Eos quis porro in non nemo ex. </p>
                      <a href="#" className="readmore">Read more </a>
                    </div>
                  </div>
                </div>

              </div>

              <div className="row counters">

                <div className="col-lg-3 col-6 text-center">
                  <span data-toggle="counter-up">274</span>
                  <p>Clients</p>
                </div>

                <div className="col-lg-3 col-6 text-center">
                  <span data-toggle="counter-up">421</span>
                  <p>Projects</p>
                </div>

                <div className="col-lg-3 col-6 text-center">
                  <span data-toggle="counter-up">1,364</span>
                  <p>Hours Of Support</p>
                </div>

                <div className="col-lg-3 col-6 text-center">
                  <span data-toggle="counter-up">18</span>
                  <p>Hard Workers</p>
                </div>
        
              </div>

            </div>
          </section>

          <section id="#developer" class="section-agents section-t8">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="title-wrap d-flex justify-content-between">
                    <div class="title-box">
                      <h2 class="title-a">Developer</h2>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="card-box-d">
                    <div class="card-img-d">
                      <img src="/images/Thanh.jpg" alt="" class="img-d img-fluid"/>
                    </div>
                    <div class="card-overlay card-overlay-hover">
                      <div class="card-header-d">
                        <div class="card-title-d align-self-center">
                          <h3 class="title-d">
                            <a class="link-two">MAI VĨNH THÀNH
                              </a>
                          </h3>
                        </div>
                      </div>
                      <div class="card-body-d">
                        <p class="content-d color-text-a">
                          FullStack Developer
                        </p>
                        <div class="info-agents color-a">
                          <p>
                            <strong>Phone: </strong> 0979 04 33 72</p>
                          <p>
                            <strong>Email: </strong> vinhthanh.ute@gmail.com</p>
                        </div>
                      </div>
                      <div class="card-footer-d">
                        <div class="socials-footer d-flex justify-content-center">
                          <ul class="list-inline">
                            <li class="list-inline-item">
                              <a href="#" class="link-one">
                                <i class="fa fa-facebook" aria-hidden="true"></i>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#" class="link-one">
                                <i class="fa fa-twitter" aria-hidden="true"></i>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#" class="link-one">
                                <i class="fa fa-instagram" aria-hidden="true"></i>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#" class="link-one">
                                <i class="fa fa-pinterest-p" aria-hidden="true"></i>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#" class="link-one">
                                <i class="fa fa-dribbble" aria-hidden="true"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card-box-d">
                    <div class="card-img-d">
                      <img src="/images/Nhi.jpg" alt="" class="img-d img-fluid" />
                    </div>
                    <div class="card-overlay card-overlay-hover">
                      <div class="card-header-d">
                        <div class="card-title-d align-self-center">
                          <h3 >
                            <a class="link-two">HUỲNH THỊ TUYẾT NHI
                              <br /> Ran</a>
                          </h3>
                        </div>
                      </div>
                      <div class="card-body-d">
                        <p class="content-d color-text-a">
                          FrontEnd Developer
                        </p>
                        <div class="info-agents color-a">
                          <p>
                            <strong>Phone: </strong> 0853 771 565</p>
                          <p>
                            <strong>Email: </strong> tuyetnhiute1008@gmail.com</p>
                        </div>
                      </div>
                      <div class="card-footer-d">
                        <div class="socials-footer d-flex justify-content-center">
                          <ul class="list-inline">
                            <li class="list-inline-item">
                              <a href="#" class="link-one">
                                <i class="fa fa-facebook" aria-hidden="true"></i>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#" class="link-one">
                                <i class="fa fa-twitter" aria-hidden="true"></i>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#" class="link-one">
                                <i class="fa fa-instagram" aria-hidden="true"></i>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#" class="link-one">
                                <i class="fa fa-pinterest-p" aria-hidden="true"></i>
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#" class="link-one">
                                <i class="fa fa-dribbble" aria-hidden="true"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>

        <footer id="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">

                <div className="col-lg-6 col-md-6 footer-info">
                  <h3>JIRALLO</h3>
                  <p>Manage Software Project </p>
                </div>

                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>Useful Links</h4>
                  <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#manual">Manual</a></li>
                    <li><a href="#developer">Developer</a></li>
                  </ul>
                </div>

                <div className="col-lg-3 col-md-6 footer-contact">
                  <h4>Contact Us</h4>
                  <p>
                    01 vo van ngan <br />
                    Linh Chieu, Thu Duc<br />
                    TPHCM <br />
                    <strong>Phone:</strong> 0979 04 33 72 - 0853 771 565<br />
                    <strong>Email:</strong> vinhthanh.ute@gmail.com - tuyetnhiute1008@gmail.com<br />
                  </p>

                  <div className="social-links">
                    <a href="#" className="twitter"><i className="fa fas-twitter"></i></a>
                    <a href="#" className="facebook"><i className="fa fas-facebook"></i></a>
                    <a href="#" className="instagram"><i className="fa fas-instagram"></i></a>
                    <a href="#" className="google-plus"><i className="fa fas-google-plus"></i></a>
                    <a href="#" className="linkedin"><i className="fa fas-linkedin"></i></a>
                  </div>

                </div>

              </div>
            </div>
          </div>

          <div className="container">
            <div className="copyright">
              &copy; Copyright <strong>NewBiz</strong>. All Rights Reserved
            </div>
            <div className="credits">
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
export default BannerLeft 