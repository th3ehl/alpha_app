import React from 'react';
import { connect } from 'react-redux';
import { authActions } from '../_actions';

class RegistrationContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const { dispatch } = this.props;

		const userData = {
			email: this.state.email,
			password: this.state.password,
		}

		dispatch(authActions.register({ user: userData }));
	}

	render() {
		const { currentUser } = this.props.authentication;

		return(
			<div>
				{!currentUser && 

					<form className="form-standard form-session"
						onSubmit={this.handleSubmit}>
					    
					    <br/>

					    <label>
					    	Email Address
						    <input type="text"
						    	name="email"
								placeholder="Your Email address" 
								value={this.state.email} 
								onChange={this.handleChange} 
								/>
						</label>

						<br/>

					    <label>
					    	Password
				        	<input type="password"
				          		name="password"
				          		placeholder="Type password here"
				          		value={this.state.password}
				          		onChange={this.handleChange} 
				          		/>
				        </label>

				        <br/>

				        <input type="submit"
				        	className="form-standard__submit width__100"
				        	value="Submit" 
				        	/>	

					</form>

				}
			</div>
		)
  	}
}

function mapStateToProps(state) {
	const { authentication } = state;

	return {
		authentication
	}
}

const connectedRegistrationContainer = connect(mapStateToProps)(RegistrationContainer);
export { connectedRegistrationContainer as RegistrationContainer };






