import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import styled from "styled-components";

const HeaderContainer = styled.header`
	background: darkgray;
	margin-bottom: 1.45rem;
	font-family: 'Source Sans Pro', sans-serif;

	div {
		margin: 0 auto;
		max-width: 960px;
		padding: 0.85rem 1.0875rem;
	}
`;

const HeaderText = styled.h3`
	font-family: inherit;
	margin: 0;
`;

const Header = ({ siteTitle }) => (
	<HeaderContainer>
		<link href="https://fonts.googleapis.com/css?family=Muli|Source+Sans+Pro&display=swap" rel="stylesheet" />
		<div>
			<HeaderText>
				<Link to="/" style={{ color: `white`, textDecoration: `none` }}>{siteTitle}</Link>
			</HeaderText>
		</div>
	</HeaderContainer>
);
	
Header.propTypes = {
	siteTitle: PropTypes.string,
};

Header.defaultProps = {
	siteTitle: ``,
};

export default Header;
	