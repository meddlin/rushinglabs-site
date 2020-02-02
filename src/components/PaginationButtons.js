import React from "react";
import { Link } from 'gatsby';
import styled from "styled-components";

const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const PaginationButtons = ({ currentPage, numPages }) => {
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? '/blog' : (currentPage - 1).toString();
    const nextPage = (currentPage + 1).toString();

    return (
        <HorizontalContainer style={{ justifyContent: 'space-between' }}>
            {!isFirst && (
                <Link to={prevPage} rel="prev">← Previous Page</Link>
            )}
            {Array.from({ length: numPages }, (_, i) => (
                <div key={`pagination-number${i + 1}`} style={{ margin: 0, }}>
                    <Link to={`/blog/${i === 0 ? '' : i + 1}`}
                        style={{ textDecoration: 'none', color: i + 1 === currentPage ? '#ffffff' : '', 
                        background: i + 1 === currentPage ? '#007acc' : '', }}>
                    {i + 1}
                    </Link>
                </div>
            ))}
            {!isLast && (
                <Link to={`/blog/${nextPage}`} rel="next">Next Page →</Link>
            )}
        </HorizontalContainer>
    );
};

export default PaginationButtons;