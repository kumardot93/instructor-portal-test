import React, { Component } from 'react';
import CloseOverlay from './../CloseOverlay.js';
import styles from './css/OverlayForm.module.css';

class OverlayForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [], //data for test responses to be fetched
			spinner: 'spinner-grow'
		};
	}

	componentDidMount = () => {
		fetch(window.base + '/studentTest/api/testSA/response/' + this.props.pk + '/', { credentials: window.cred }) //fetching form data from backend
			.then((response) => response.json())
			.then((data) => {
				this.setState((state, props) => {
					return { data: data, spinner: '' }; //storing response to this.state.form_data
				});
			})
			.catch((error) => alert(error));
	};

	render() {
		let btns;
		if (this.state.data.length === 0) btns = <h4 className="text-center mt-3">No attempts yet...</h4>;
		else
			btns = this.state.data.map((data, index) => {
				let t = new Date(data.fields.time);
				return (
					<a
						href={window.base + '/material/check-test/' + data.pk}
						target="_blank"
						rel="noopener noreferrer"
						className={'btn btn-light form-control mt-1 text-left ' + styles.resLink}
						style={{ height: 'auto' }}
					>
						{data.fields.student}
						<span className="float-right">
							{t.toDateString() + '  '}
							{t.toLocaleTimeString()}
						</span>
					</a>
				);
			});

		return (
			<div className="container bg-light" id={styles.overlaymain}>
				<button id={styles.cross} onClick={(event) => CloseOverlay(event, styles.overlaymain)}>
					<i className="material-icons">cancel</i>
				</button>
				{this.state.spinner === '' ? (
					<React.Fragment>
						<h1 className="text-center display-4">Test Attempts</h1>
						<div className="d-flex flex-column-reverse">{btns}</div>
						{/* column reverse to show latest first */}
					</React.Fragment>
				) : (
					<div id={styles.spinnerCont} className="text-dark">
						<div className={[ 'spinner-grow', styles.spinner ].join(' ')} />
						<div className={[ 'spinner-grow', styles.spinner ].join(' ')} />
						<div className={[ 'spinner-grow', styles.spinner ].join(' ')} />
					</div>
				)}
			</div>
		);
	}
}

export default OverlayForm;
