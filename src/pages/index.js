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
`;

const VerticalContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding: 0 4em 0 4em;
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