import React from "react";
import { Link } from "react-router-dom";

import "../../css/animate.min.css";
import "../../css/bootstrap.min.css";
import "../../css/icofont.css";
import "../../css/style.css";
import "../../css/magnific-popup.css";
import "../../css/responsive.css";
import "../../css/slick.css";
import "../../css/slicknav.min.css";
import "../../css/switcher-style.css";

export default () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="row">
          <br />
          <br />
          <br />
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="copyright-area">
              <ul>
                <li>
                  <Link to="#">
                    <i className="icofont-facebook" />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="icofont-instagram" />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="icofont-google-plus" />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="icofont-twitter" />
                  </Link>
                </li>
              </ul>
              <p>
                Alva Petra Stevanus Mende &copy;{" "}
                <script>document.write(new Date().getFullYear());</script>2019
                All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
