import React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';
import Layout from "../components/layout";
import SEO from "../components/seo";

import csharpLogo from "../images/cpat-pics/c-sharp_83x95.png";

const ColumnPiece = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
`;

const TitlePiece = styled(ColumnPiece)`
    
`;

const Subtitle = styled(ColumnPiece)`
    margin-top: 2em;
    padding: 5em;
    background-color: lightgray;
`;

const Logos = styled(ColumnPiece)`

`;

const StoryExplanation = styled(ColumnPiece)`
    padding: 5em;
    background-color: lightblue;
`;

const Stacks = styled(Row)`
    justify-content: space-between;
`;

const Faqs = styled(ColumnPiece)`
    div {
        cursor: pointer;
    }
`;

const CpatPage = () => {
    return (
        <div>
            <SEO title="cpat" />

            <Layout>
                <TitlePiece>
                    <h2>CPAT: Collaborative Pen-testing &amp; Analysis "Toolkit"</h2>
                    <a href="https://github.com/meddlin/cpat">Github</a>
                </TitlePiece>
                <Subtitle>
                    <p>A (real-time?) distributed system for automating OSINT data.</p>
                    <p>
                        Penetration tests are kicked off with reconnaissance commonly relying on OSINT resources. 
                        Relating those data points and keeping track of the work can be challenging. CPAT is a project 
                        that attempts to organize this data, and make operation possible on IoT devices.
                    </p>
                </Subtitle>
                <Logos>
                    <Row><img src={csharpLogo} /> React, RxJS, Python</Row>
                    <Row>SignalR, .NET Core</Row>
                    <Row>Kafka, CockroachDB, Elastic</Row>
                    <Row>RPi</Row>
                </Logos>
                <StoryExplanation>
                    <h3>But Why?</h3>
                    <p>
                        CPAT started as a naively hopeful academic project born out of a desire to learn more about infosec. 
                        It was a headfirst approach, and although leading the project, I didn't know what I didn't know.
                    </p>
                    <p>
                        A professor in our department caught wind of our ideas and suggested we write a research paper. For a 
                        couple undergrads, this was simultaneously exciting and daunting. However, three months, two 100 hour 
                        weeks, and some incredulous editing later and we had our ticket to IEEE. 
                    </p>

                    <a href="https://ieeexplore.ieee.org/document/7119262">CPAT Research Paper</a>

                    <p>
                        <i>
                            It's 5 years later. I'm tired of half-heartedly toying with this rough idea. It's time to create 
                            it or move on.
                        </i>
                    </p>
                </StoryExplanation>
                <Stacks>
                    <div style={{ borderRight: '1px solid black' }}>
                        <p>Web app: the stack</p>
                        <div>Client-side: React + RxJS</div>

                        <div>Server \ "Core API": C#, .NET Core, SignalR</div>
                        <div>Server \ "OSINT API": Python</div>

                        <div>Data Arch: </div>
                        <div>CockroachDB (primary store)</div>
                        <div>Kafka (data stream)</div>
                        <div>Elastic (search/analytics)</div>
                    </div>
                    <div>
                        <p>IoT: the stack</p>
                        <div>Server \ "Core API": C#, .NET Core, SignalR</div>
                        <div>Server \ "OSINT API": Python</div>

                        <div>Data Arch: </div>
                        <div>CockroachDB (primary store)</div>
                        <div>Kafka (data stream)</div>
                    </div>
                </Stacks>
                <Faqs>
                    <h3>FAQ</h3>
                    <div>Have you heard of Spiderfoot?</div>
                    <p>
                        Yep! and it's great stuff. The idea for CPAT started before I was aware of such projects 
                        (or really any of them), so there is no attempt to compete with Spiderfoot. Ideally, there 
                        would be quite a bit of collaboration/interoperability between the two.
                    </p>
                    <div>What if this works?</div>
                    <p>
                        <ul>
                            <li>CPAT will remain open-source.</li>
                            <li>A business model will appear if it makes sense.</li>
                            <li>It must run on "commodity" hardware (sub-$10k systems</li>
                        </ul>
                    </p>
                    <div>What if it sucks?</div>
                    <p>Then we learn.</p>
                </Faqs>
            </Layout>
        </div>
    );
}

export default CpatPage;