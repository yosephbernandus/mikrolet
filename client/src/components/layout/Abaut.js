import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../css/animate.min.css';
import '../../css/bootstrap.min.css';
import '../../css/icofont.css';
import '../../css/style.css';
import '../../css/magnific-popup.css';
import '../../css/responsive.css';
import '../../css/slick.css';
import '../../css/slicknav.min.css';
import '../../css/switcher-style.css';

import showcase from '../../img/showcase.png';
import showcase2 from '../../img/showcase2.png';

class Abaut extends Component {
  render() {
    return (
		<div className="Content" id="abaut">
		<section class="showcase-area ptb-90">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">
					    <div class="sec-title">
							<h4>Abaut Us</h4>
							<hr />
							<p>Intelligent Information System for General Transportation in Manado City.</p>
						</div>
					</div>
				</div>
				<div class="row flexbox-center">
					<div class="col-lg-6">
						<div class="single-showcase-box">
							<h4><i className="icofont-user-alt-5"/> <b>User</b></h4>
							<p>Users can view information in <i>real-time</i>. Information about the location of public transport, public transport routes and their prices, the number of passengers on public transportation, the time for public transport to the user's location.</p>
							<Link href="#" class="appao-btn appao-btn2">Read More</Link>
						</div>
					</div>
					<div class="col-lg-6">
						<div class="single-showcase-box">
							<img src={showcase} alt="showcase"/>
						</div>
					</div>
				</div>
				<div class="row flexbox-center">
					<div class="col-lg-6">
						<div class="single-showcase-box">
							<img src={showcase2} alt="showcase"/>
						</div>
					</div>
					<div class="col-lg-6">
						<div class="single-showcase-box">
							<h4><i className="icofont-car"/> <b>Driver</b></h4>
							<p>Drivers can see information in <i>real-time</i>. Information about the location of the passenger, the number of passengers at that location, the time of the transit of public transportation to the location of the passenger is located.</p>
							<Link href="#" class="appao-btn appao-btn2">Read More</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
		<br />
		</div>
    );
  }
}

export default Abaut;