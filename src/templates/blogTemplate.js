import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "styled-components";

const PostContainer = styled.div`
	margin: 0 8em 0 8em;
`;
const PostDate = styled.p`
	font-size: 0.83255rem;
	line-height: 1.75rem;
	display: block;
	margin-bottom: 1.75rem;
	margin-top: -1.75rem;
`;
const PostSeparator = styled.hr`
	margin-bottom: 1.75rem;
`;

export default function Template({ data }) { // this prop will be injected by the GraphQL query below.
    const { markdownRemark } = data // data.markdownRemark holds your post data
    const { frontmatter, html, excerpt } = markdownRemark;

    return (
        <Layout>
            <SEO title={frontmatter.title} description={excerpt} />

            <PostContainer>
                <h1>{frontmatter.title}</h1>
                <PostDate>{frontmatter.date}</PostDate>
                <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
            
                <PostSeparator />
            </PostContainer>
        </Layout>
    );
};

export const pageQuery = graphql`
query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
        html
        excerpt(pruneLength: 250)
        frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
        }
    }
}`;