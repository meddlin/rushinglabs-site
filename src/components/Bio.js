import React from 'react';
import { Link } from 'gatsby';
import styled from "styled-components";

const VerticalContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
    align-content: center;
    align-self: flex-start;
`;

const ProfileSection = styled(VerticalContainer)`
	flex-basis: 30%;
	
	padding-right: 2em;
	border-right: 1px solid darkgray;
    min-width: 280px;
    
    hr {
        margin-top: 1.5em;
    }
`;

const BioBlurb = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        width: 15%;
        margin-bottom: 10px;
        border-radius: 100%;
        min-width: 100px;
        max-height: 100px;
    }

    @media only screen 
        and (min-device-width: 350px) 
		and (max-device-width: 650px)
	{
        flex-direction: row;
        
        img {
            margin-right: 1em;
        }
	}
`;

const SiteSections = styled.div`
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
`;

const Bio = () => (
    <ProfileSection>
        <BioBlurb>
            <img src="https://meddlin-web.s3.us-east-2.amazonaws.com/online-avatar.jpg" alt={`Darrien Rushing`} />
            {/* <Image fixed={data.avatar.childImageSharp.fixed} alt={author} /> */}
            <div>
                I like building things almost as much as I like 
                tearing them apart. I write about those things here.
            </div>
        </BioBlurb>
        <hr />
        <SiteSections>
            <ul>
                <li>
                    <Link to="/cpat/">CPAT</Link>
                </li>
                <li>
                    <Link to="/about/">About</Link>
                </li>
            </ul>
        </SiteSections>
    
    {/* <div>social links</div> */}
    </ProfileSection>
);

export default Bio;