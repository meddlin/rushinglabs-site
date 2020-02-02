import React from "react";
import { Link } from "gatsby";

import Bio from "../components/Bio";
import PostLink from "../components/post-link";
import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

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
			<h1>Hi people</h1>
			<p>Welcome to your new Gatsby site.</p>
			<p>Now go build something great.</p>
			<div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
				<Image />
			</div>

			<hr />
				{/* <BlogList /> */}
			<hr />

			<Link to="/page-2/">Go to page 2</Link>

			{Posts.length > 0 ? Posts : ''}

			<Bio />
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
					}
				}
			}
		}
	}
`;