import React, { Component } from 'react';
import CloseOverlay from './../CloseOverlay.js';
import styles from './css/OverlayForm.module.css';

import Cookies from 'js-cookie';

class OverlayForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			success: 0, //success !=0 if task sucessfull
			spinner: 'spinner-grow',
			btnSpinner: '',
			error_msg: null
		};
	}

	componentDidMount = () => {
		fetch(this.props.url, { credentials: window.cred }) //fetching just to ensure csrf token is set in cookie
			.then((response) => response.text())
			.then((data) => {
				this.setState((state, props) => {
					return { spinner: '' }; //removing spinner
				});
			})
			.catch((error) => alert(error));
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.setState({ btnSpinner: 'spinner-border spinner-border-sm' });
		var form = new FormData(document.querySelector([ '#', styles.form ].join('')));
		form.append('csrfmiddlewaretoken', Cookies.get('csrftoken')); //Appending csrfg token for csrf validation
		fetch(this.props.url, {
			//sending form data to backend
			method: 'POST',
			credentials: window.cred,
			body: form
		})
			.then((response) => response.text())
			.then((data) => {
				if (data.toLowerCase().substring(0, 7) === 'success') {
					let pk = parseInt(data.toLowerCase().substring(8)); //Extracting pk from the success response
					if (this.props.success_callback) {
						this.props.success_callback();
						console.log('success_callback');
					}
					setTimeout(() => {
						window.open(this.props.success_url + pk, '_blank'); //Opens a new window to adust the new created element
						// window.location.reload();
					}, 2500);
					this.setState((state, props) => {
						return {
							success: pk,
							btnSpinner: ''
						};
					});
				} else {
					//else show errors received from backend
					this.setState((state, props) => {
						return {
							error_msg: data, //render Error message
							btnSpinner: ''
						};
					});
				}
			})
			.catch((error) => this.setState({ btnSpinner: '', error_msg: error.message }));
	};

	render() {
		return (
			<div className="container bg-light" id={styles.overlaymain}>
				<button id={styles.cross} onClick={(event) => CloseOverlay(event, styles.overlaymain)}>
					<i className="material-icons">cancel</i>
				</button>
				{this.state.spinner === '' ? (
					<React.Fragment>
						<h1 className="text-center display-4">{this.props.title}</h1>
						{this.state.success !== 0 ? (
							<label className="alert-success form-control" style={{ width: '95%', height: 'auto' }}>
								New Test created successfully. You will be redirected to test dashboard shortly...
							</label>
						) : (
							''
						)}
						{this.state.error_msg === null ? (
							''
						) : (
							<label className="alert-danger form-control" style={{ width: '95%', height: 'auto' }}>
								{this.state.error_msg}
							</label>
						)}
						<form onSubmit={this.submitHandler} id={styles.form} className={styles.form}>
							<fieldset disabled={this.state.btnSpinner !== '' || this.state.success === 1}>
								<label>Title:</label>
								<input className="form-control" name="title" type="text" required />
								<label className="mt-2">Description:</label>
								<textarea className="form-control" rows="7" name="description" required />
							</fieldset>
							<p className="m-2">You can always edit these fields later</p>
							{this.state.success === 0 ? (
								<button
									className="btn btn-primary"
									id={styles.submit}
									type="submit"
									disabled={this.state.btnSpinner !== ''}
								>
									submit
									<span
										className={this.state.btnSpinner}
										style={{
											marginLeft: '6px',
											display: this.state.btnSpinner === '' ? 'none' : 'inline-block'
										}}
									/>
								</button>
							) : (
								''
							)}
						</form>
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
