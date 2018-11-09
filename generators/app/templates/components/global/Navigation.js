import React from 'react';
import Link from 'next/link';
import styled from "react-emotion";

const Navigation = styled.nav`
	${tw` flex items-center p-6 shadow `}

	a {
		${tw` text-black no-underline inline-block mr-2 `}
	}
`;

const NavigationComp = () => {
	return (
		<header>
			<Navigation>
				<Link href="/"><a>Home</a></Link>
				<Link href="/about"><a>About</a></Link>
				<Link href="/contact"><a>Contact</a></Link>
			</Navigation>
		</header>
	)
}

export default NavigationComp;
