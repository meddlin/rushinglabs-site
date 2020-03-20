import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";
import Bio from "../components/Bio";
import SEO from "../components/seo";

const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;

    @media only screen 
        and (min-device-width: 350px) 
		and (max-device-width: 650px)
	{
		flex-direction: column-reverse;
	}
`;
const VerticalContainer = styled.div`
    display: flex;
    flex-direction: column;

    font-family: 'Muli', sans-serif;
    padding: 0 10em 0 10em;

    @media only screen 
        and (min-device-width: 350px) 
		and (max-device-width: 650px)
	{
        padding: 0 1em 0 1em;
        margin-bottom: 2em;
	}
`;

const Header = styled.h1`
    font-family: 'Source Sans Pro', sans-serif;
`;

const AboutPage = () => {
    return (
        <div>
            <SEO title="About" />
            <link href="https://fonts.googleapis.com/css?family=Muli|Source+Sans+Pro&display=swap" rel="stylesheet" />

            <Layout>
                <HorizontalContainer>
                    <Bio />

                    <VerticalContainer>
                        <Header>About Me</Header>

                        <p>
                            Hi! I'm Darrien. I'm a software engineer, and I create the stuff you see on this site. I enjoy building 
                            distributed software, tinkering with PC hardware, and have a growing interest in data privacy and 
                            security.
                        </p>
                        <p>
                            It's my hope that I can help others learn and do more with their technology than they previously thought possible. 
                            So, anything you see on this site I encourage you to <i><b>try it at home!</b></i>
                        </p>

                        <h3 style={{ fontFamily: `'Muli', sans-serif`}}>How I Started</h3>

                        <p>
                            I grew up in a small town, in the deep south US, where there was little interest in technology or anything related to computer science.
                            So, gaming became my introduction. I spent roughly 10 years growing from a passing interest in a fun way to spend
                            time with friends to being enamored by what video games were becoming. That interest grew until someone suggested
                            that I first learn how to work with computers instead of focusing purely on video games.
                        </p>

                        <p>
                            There wasn't anyone around to show me how or where to start. So, it was just me,
                            a screwdriver, and an old unassuming HP desktop tower. Starting with that one <i>tedious</i> evening in my 
                            bedroom I spent the next two years researching the basics of PC hardware:
                            <ul style={{ marginTop: '1.6em' }}>
                                <li>What's a hard drive?</li>
                                <li>What's a motherboard?</li>
                                <li>How does a CPU compare to a GPU? Which do I have?</li>
                                <li>What do they look like? How do they connect?</li>
                            </ul>
                        </p>

                        <p>
                            Once I'd made my way through that the next piece seemed to be...<i>"well, what is code?"</i>.
                        </p>

                        <h3 style={{ fontFamily: `'Muli', sans-serif`}}>Programming? What's Next?</h3>

                        <p>
                            I had to once again start from scratch except this time programming felt more ethereal or "<i>magical</i>"
                            than ripping apart hardware. I couldn't put my hands on it. So, I grabbed a "teach yourself VB" book, and
                            dove in. This is what I had for about a year until I first stepped into a computer science classroom in
                            college.
                        </p>

                        <p>
                            Things grew quickly from there, and a few years later I stepped into corporate (enterprise?) software 
                            development. But I never lost that desire to always bring the problem back to something tangible.
                        </p>

                        <p>
                            While admittedly enterprise software development isn't the most exiciting place to be it's taught me
                            some interesting lessons and exposed me to technologies I never imagined I would be able to see. I've 
                            written COBOL and JCL, built multi-threaded ETL services for Elastic, and found myself discovering
                            more back-end data structures making their way to JavaScript and the rest of the front-end.
                        </p>
                    </VerticalContainer>
                </HorizontalContainer>
            </Layout>
        </div>
    );
}

export default AboutPage;