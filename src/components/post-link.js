import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const ArticleHeading = styled.div`
    font-family: 'Source Sans Pro', sans-serif;    
    font-size: 1.6875rem;
    line-height: 2.4375rem;
    margin-top: 0;
    margin-bottom: .8125rem;
`;

const PostLink = ({ post }) => (
    <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <ArticleHeading>
                <Link style={{ boxShadow: 'none' }} to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </ArticleHeading>
            <small>{post.frontmatter.date}</small>
        </div>
        <p>{post.excerpt}</p>
    </div>
);

export default PostLink;