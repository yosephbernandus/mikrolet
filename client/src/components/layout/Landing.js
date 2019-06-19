import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/animate.min.css";
import "../../css/bootstrap.min.css";
import "../../css/font-awesome.min.css";
import "../../css/magnific-popup.css";
import "../../css/owl.carousel.css";
import "../../css/responsive.css";
import "../../css/slick.css";
import "../../css/slicknav.min.css";
import "../../css/style.css";
import "../../css/switcher-style.css";

import logo from "../../img/hand-mockup1.png";

class Landing extends Component {
  render() {
    return (
      <section className="hero-area" id="home">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="hero-area-content">
                <h1>
                  Intelligent Information System for General Transportation
                  <br />
                  in Manado City.
                </h1>
                <p>
                  Kota cerdas merupakan target pemerintah kota Manado yang harus
                  dicapai pada tahun 2021 nanti, untuk menjadikan kota Manado
                  sebagai kota cerdas maka pemerintah harus memperhitungkan
                  semua aspek-aspek yang memiliki peranan penting untuk
                  menunjang tercapainya <b>Manado Smart City</b>.
                </p>
                <Link to="about.html" className="appao-btn">
                  Read More
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hand-mockup text-lg-left text-center">
                <img src={logo} alt="Hand Mockup" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Landing;
