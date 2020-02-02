import React from 'react';
import { Link } from 'gatsby';
import styled from "styled-components";

const VerticalContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
`;
const ProfileSection = styled(VerticalContainer)`
	flex-basis: 30%;
	padding-left: 6em;
	padding-right: 2em;
	border-right: 1px solid darkgray;
	margin-right: 1em;
`;

const Bio = () => (
    <ProfileSection>
        <img src="https://meddlin-web.s3.us-east-2.amazonaws.com/online-avatar.jpg" 
            alt={`Darrien Rushing`}
            style={{ width: '15%', marginBottom: 0, minWidth: 50, borderRadius: `100%`, }} />
        {/* <Image fixed={data.avatar.childImageSharp.fixed} alt={author}
            style={{ marginRight: rhythm(1 / 2), marginBottom: 0, minWidth: 50, borderRadius: `100%`, }} /> */}
        <div>
            I like building things almost as much as I like 
            tearing them apart. I write about those things here.
        </div>
        <div style={{ marginTop: '5em' }}>
            <ul>
                <li>
                    <Link to="/cpat/">CPAT</Link>
                </li>
                <li>
                    <Link to="/about/">About</Link>
                </li>
            </ul>
        </div>
    
    {/* <div>social links</div> */}
    </ProfileSection>
);

export default Bio;