import React, { Component } from 'react';
import styles from './css/Main.module.css';
import Tests from './Tests.js';

import { connect } from 'react-redux';
import { updateMaterial } from '../../redux/actions/Tests.js';

class Main extends Component {
	//Fetching Dashboard data

	fetchTestList = () => {
		//fetching details for all test data
		fetch(window.base + '/studentTest/api/list-testSA/', { credentials: window.cred })
			.then((response) => response.json())
			.then((data) => this.props.updateMaterial(data))
			.catch((error) => alert(error));
	};

	componentDidMount = () => {
		//fetching details for all test data
		this.fetchTestList();
	};

	render() {
		return (
			<div id={styles.main}>
				<Tests updateList={this.fetchTestList} />
			</div>
		);
	}
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
	return {
		updateMaterial: (data) => dispatch(updateMaterial(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
