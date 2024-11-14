const NavBar = () => {
    return (
        <>
            <div id="preloder">
                <div className="loader"></div>
            </div>

            <div className="offcanvas-menu-overlay"></div>
            <div className="offcanvas-menu-wrapper">
                <div className="canvas-close">
                    <i className="fa fa-close"></i>
                </div>
                <div className="canvas-search search-switch">
                    <i className="fa fa-search"></i>
                </div>
                <nav className="canvas-menu mobile-menu">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about-us.html">About Us</a></li>
                        <li><a href="./classes.html">Classes</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="team.html">Our Team</a></li>
                        <li><a href="#">Pages</a>
                            <ul className="dropdown">
                                <li><a href="about-us.html">About us</a></li>
                                <li><a href="className-timetable.html">Classes timetable</a></li>
                                <li><a href="bmi-calculator.html">Bmi calculate</a></li>
                                <li><a href="team.html">Our team</a></li>
                                <li><a href="gallery.html">Gallery</a></li>
                                <li><a href="blog.html">Our blog</a></li>
                                <li><a href="404.html">404</a></li>
                            </ul>
                        </li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>
                <div id="mobile-menu-wrap"></div>
                <div className="canvas-social">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-youtube-play"></i></a>
                    <a href="#"><i className="fa fa-instagram"></i></a>
                </div>
            </div>
            <header className="header-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="logo">
                                <a href="index.html">
                                    <img src="img/logo.png" alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <nav className="nav-menu">
                                <ul>
                                    <li className="active"><a href="index.html">Home</a></li>
                                    <li><a href="public/about-us.html">About Us</a></li>
                                    <li><a href="public/className-details.html">classNamees</a></li>
                                    <li><a href="public/services.html">Services</a></li>
                                    <li><a href="public/team.html">Our Team</a></li>
                                    <li><a href="#">Pages</a>
                                        <ul className="dropdown">
                                            <li><a href="public/about-us.html">About us</a></li>
                                            <li><a href="public/className-timetable.html">classNamees timetable</a></li>
                                            <li><a href="public/bmi-calculator.html">Bmi calculate</a></li>
                                            <li><a href="public/team.html">Our team</a></li>
                                            <li><a href="public/gallery.html">Gallery</a></li>
                                            <li><a href="public/blog.html">Our blog</a></li>
                                            <li><a href="public/404.html">404</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="public/contact.html">Contact</a></li>
                                    <li><a href="/showLoginPage">Login</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-2">
                            <div className="top-option">
                                <div className="to-search search-switch">
                                    <i className="fa fa-search"></i>
                                </div>
                                <div className="to-social">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-youtube-play"></i></a>
                                    <a href="#"><i className="fa fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="canvas-open">
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
            </header>
        </>
    );
}
export default NavBar