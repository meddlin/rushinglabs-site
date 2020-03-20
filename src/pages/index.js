import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import Bio from "../components/Bio";
import PostLink from "../components/post-link";
import Layout from "../components/layout";
import SEO from "../components/seo";

const HorizontalContainer = styled.div`
    display: flex;
	flex-direction: row;

	@media only screen 
        and (min-device-width: 350px) 
		and (max-device-width: 650px)
	{
		flex-direction: column-reverse;
	}
`;

const VerticalContainer = styled.div`
    display: flex;
    flex-direction: column;

	padding: 0 3em 0 3em;
	
	@media only screen 
        and (min-device-width: 350px) 
		and (max-device-width: 650px)
	{
		margin-bottom: 5em;
		padding: 0 1em 0 1em;
	}
`;

const IndexPage = ({
	data: {
		allMarkdownRemark: { edges },
	}
}) => {
	const Posts = edges
		.filter(edge => !!edge.node.frontmatter.date)
		.map(edge => <PostLink key={edge.node.id} post={edge.node} />);

	return (
		<Layout>
			<SEO title="Home" />
			<HorizontalContainer>
				{/* <Image /> */}
				<Bio />

				<VerticalContainer>
					{Posts.length > 0 ? Posts : ''}
					<Link to={`/blog`}>More...</Link>
				</VerticalContainer>
			</HorizontalContainer>
		</Layout>
	);
}
	
export default IndexPage;

export const pageQuery = graphql`
	query {
		allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
			edges {
				node {
					id
					excerpt(pruneLength: 250)
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						path
						title
						tags
					}
				}
			}
		}
	}
`;