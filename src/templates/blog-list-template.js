import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PaginationButtons from "../components/PaginationButtons";

export default class BlogList extends React.Component {
    render() {
        const posts = this.props.data.allMarkdownRemark.edges;
        const { currentPage, numPages } = this.props.pageContext;

        return (
            <Layout>
                {posts.map( ({ node }) => {
                    const title = node.frontmatter.title || node.fields.slug;
                    return (
                        <div key={node.fields.slug}>{title}</div>
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
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
}
`