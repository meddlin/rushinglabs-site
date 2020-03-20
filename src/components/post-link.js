import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Article = styled.div`
    margin-bottom: 1.75rem;
`;

const ArticleHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @media only screen 
        and (min-device-width: 350px) 
		and (max-device-width: 650px)
	{
        flex-direction: column;
        align-items: flex-start;

        small {
            font-weight: bold;
        }
	}
`;

const ArticleHeading = styled.div`
    font-family: 'Source Sans Pro', sans-serif;    
    font-size: 1.6875rem;
    line-height: 2.4375rem;
    margin-top: 0;
    margin-bottom: .8125rem;

    @media only screen 
        and (min-device-width: 350px) 
		and (max-device-width: 650px)
	{
		font-size: 22px;
	}
`;

const ArticlePreview = styled.p`
    font-family: 'Muli', sans-serif;

    margin-bottom: 0.25em;
`;

const PostLink = ({ post }) => (
    <Article>
        <ArticleHeaderContainer>
            <ArticleHeading>
                <Link style={{ boxShadow: 'none' }} to={post.frontmatter.path}>
                    {post.frontmatter.title}
                </Link>
            </ArticleHeading>
            <small>{post.frontmatter.date}</small>
        </ArticleHeaderContainer>

        <ArticlePreview dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        {post.frontmatter.tags && post.frontmatter.tags.length > 1 ? <span>
            {post.frontmatter.tags.map(t => {
                return (<span>{`${t} | `}</span>);
            })}
        </span> : <span>{post.frontmatter.tags}</span> }
    </Article>
);

export default PostLink;