import { Component } from 'react';
import styled from "react-emotion";

const Title = styled.h1`
	${tw` text-blue md:text-green lg:text-red `}
`

class Contact extends Component {

	static async getInitialProps () {

	}

	render () {
		return (
			<>
				<Title>Contact Page</Title>
			</>
		)
	}
}

export default Contact;