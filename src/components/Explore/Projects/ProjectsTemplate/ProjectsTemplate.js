import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import ROUTES from "../../../../routes/routes";
import ProgressBar from "../../../General/ProgressBar/ProgressBar";
import percentage from "../../../../helpers/functions/percentage";
import {Http} from "../../../../services/Http";
import ShowMoreText from "../../../General/ShowMoreText/ShowMoreText";
import {STAGES} from "../../../../helpers/enums/stages";
import SeeMore from "../../../UI/SeeMore/SeeMore";

class ProjectsTemplate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			originator: ""
		};
	}

	componentDidMount = () => {
		// this.originatorSub = Http.originatorGet(
		// 	this.props.data.OriginatorIndex
		// ).subscribe(originator => {
		// 	this.setState({
		// 		originator: originator.data.Name
		// 	});
		// });
	};

	componentWillUnmount = () => {
		// this.originatorSub.unsubscribe();
	};

	render() {
		const {data} = this.props;
		var investors = 0; // to handle cases where the number of investors associated with a project is zero
		if (this.props.data.InvestorIndices != null) {
			investors = this.props.data.InvestorIndices.length;
		}
		return (
			<div className="col-sm-12 col-md-6">
				<div className="projects-box-explore">
					<NavLink
						to={ROUTES.PROJECT_BASE + data.Index}
						className="no-padding"
					>
						<div className="projects-image-box">
							<button className="watch-button-explore" type="button">
								<div className="watch-icon"/>
							</button>
							<img
								src={data.MainImage}
								alt={data.Name}
							/>
						</div>
					</NavLink>
					<div className="projects-description-box">
						<div className="row">
							<div className="col-12 desc-status">
								<SeeMore>Stage {data.Stage} | {STAGES[data.Stage]}</SeeMore>
							</div>
							<div className="col-12 desc-title">
								<NavLink
									className="no-padding"
									to={ROUTES.PROJECT_BASE + data.Index}
								>
									{data.Name}
								</NavLink>
							</div>
							<div className="desc-location col-12">
								<div className="projects-location-icon location-icon"/>
								{data.City}, {data.State}, {data.Country}
							</div>
							<div className="col-6 desc-category">
								{data.InvestmentType}
							</div>
							<div className="col-6 desc-category">
								{data.Issuer}
							</div>
							<div className="desc-description col-12">
								<div className="desc-description-text">
									<ShowMoreText
										moreText="Show More"
										lessText="Show Less"
										lines={3}
									>
										{data.Description}
									</ShowMoreText>
								</div>
								<div className="desc-description-bullets">
									<ul>
										<li>{data.Bullet1}</li>
										<li>{data.Bullet2}</li>
										<li>{data.Bullet3}</li>
									</ul>
								</div>
							</div>
							<div className="col-12 specifics-box-no-mg">
								<div className="projects-description__stats">
									<div className="-primary-color">
										<p>{data.Solar}</p>
										<h6>Solar</h6>
									</div>
									<div>
										<p>250 Wh</p>
										<h6>Storage</h6>
									</div>
									<div>
										<p>
											0.0
											<span className="stats-units">
                        $/kWh
                      </span>
										</p>
										<h6>Tariff</h6>
									</div>
									<div>
										<p>{data.Stage}</p>
										<h6>Stage</h6>
									</div>
								</div>
							</div>
							<div className="col-12 specifics-box-no-mg">
								<div className="projects-description__stats">
									<div className="-blue-color">
										<p>{data.Return}</p>
										<h6>Return</h6>
									</div>
									<div>
										<p>{data.Rating}</p>
										<h6>Rating</h6>
									</div>
									<div>
										<p>n/a</p>
										<h6>Tax</h6>
									</div>
									<div>
										<p>2025</p>
										<h6>AQUISITION</h6>
									</div>
								</div>
							</div>
							<div className="col-12 specifics-box">
								<div className="row">
									<div className="col-6 spec-first-price">
										${data.MoneyRaised}
									</div>
									<div className="col-6 spec-second-price">
										${data.TotalValue}
									</div>
									<div className="col-12 ">
										<ProgressBar
											progress={percentage(
												data.MoneyRaised,
												data.TotalValue
											)}
											label={`${investors} backers`}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProjectsTemplate;
