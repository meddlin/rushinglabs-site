import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostLink from "../components/post-link";
import PaginationButtons from "../components/PaginationButtons";

export default class BlogList extends React.Component {
	render() {
		const posts = this.props.data.allMarkdownRemark.edges;
		const { currentPage, numPages } = this.props.pageContext;
		
		return (
			<Layout>
				{posts.map( ({ node }) => {
					return (
						<PostLink key={node.fields.slug} post={node} />
					);
				})}
				
				<PaginationButtons currentPage={currentPage} numPages={numPages} />
			</Layout>
		);
	}
};
		
export const blogListQuery = graphql`
query blogListQuery($skip: Int!, $limit: Int!) {
	allMarkdownRemark(
		sort: { fields: [frontmatter___date], order: DESC }
		limit: $limit
		skip: $skip
		) {
			edges {
				node {
					excerpt(pruneLength: 250)
					fields {
						slug
					}
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