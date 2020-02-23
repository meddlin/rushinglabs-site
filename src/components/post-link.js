import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Article = styled.div`
    margin-bottom: 1.75rem;
`;

const ArticleHeading = styled.div`
    font-family: 'Source Sans Pro', sans-serif;    
    font-size: 1.6875rem;
    line-height: 2.4375rem;
    margin-top: 0;
    margin-bottom: .8125rem;
`;

const ArticlePreview = styled.p`
    font-family: 'Muli', sans-serif;

    margin-bottom: 0.25em;
`;

const PostLink = ({ post }) => (
    <Article>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <ArticleHeading>
                <Link style={{ boxShadow: 'none' }} to={post.frontmatter.path}>
                    {post.frontmatter.title}
                </Link>
            </ArticleHeading>
            <small>{post.frontmatter.date}</small>
        </div>

        <ArticlePreview dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        {post.frontmatter.tags && post.frontmatter.tags.length > 1 ? <span>
            {post.frontmatter.tags.map(t => {
                return (<span>{`${t} | `}</span>);
            })}
        </span> : <span>{post.frontmatter.tags}</span> }
    </Article>
);

export default PostLink;