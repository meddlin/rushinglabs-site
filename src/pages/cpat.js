import React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';
import Layout from "../components/layout";
import SEO from "../components/seo";

import cpatArch from "../images/cpat-pics/cpat-basic-arch/cpat-api-wires.png";
import cpatIotArch from "../images/cpat-pics/cpat-basic-arch/cpat-iot-wires.png";
import githubMark from '../images/GitHub-Mark/GitHub-Mark/PNG/GitHub-Mark-Light-32px.png';
// import csharpLogo from "../images/cpat-pics/c-sharp_83x95.png";

const ColumnPiece = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
`;

const TitlePiece = styled(ColumnPiece)`
    font-family: 'Roboto', sans-serif;
    padding-left: 5em;

    span {
        font-size: 35px;
        font-weight: 400;
    }

    @media only screen 
        and (min-device-width: 350px) 
        and (max-device-width: 650px) 
    {
        padding-left: 1em;

        span {
            font-size: 30px;
        }
    }
`;

const Subtitle = styled(ColumnPiece)`
    margin-top: 2em;
    padding: 5em;
    font-family: 'Roboto', sans-serif;
    
    display; flex;
    flex-direction: row;

    .title {
        font-size: 35px;
        font-weight: 400;
    }
    
    .first {
        margin-right: 150px;
        font-size: 20px;
        word-spacing: 2px;
        font-weight: 300;
    }

    .second { 
        margin-right: 150px;
        font-size: 20px;
        word-spacing: 2px;
        font-weight: 300;
    }

    > div:first-child {
        flex-shrink: 15;
    }
    > div:last-child {
        flex-grow: 1;
    }

    // tablet
    @media only screen 
        and (min-device-width: 768px) 
        and (max-device-width: 1024px) 
        and (-webkit-min-device-pixel-ratio: 1) 
    {
        display: flex;
        flex-direction: column;
    }

    // phone
    @media only screen 
        and (min-device-width: 350px) 
        and (max-device-width: 650px) 
    {
        display: flex;
        flex-direction: column;

        margin-top: 0;
        padding: 1.5em;

        .title {
            font-size: 24px;
        }
        .first {
            margin-right: 0;
            font-size: 18px;
        }
        .second {
            margin-right: 0;
            font-size: 18px;
        }
    }
`;

const Logos = styled(ColumnPiece)`

`;

const StoryExplanation = styled(ColumnPiece)`
    padding: 5em;
    font-family: 'Roboto', sans-serif;

    .title {
        span {
            font-size: 35px;
            font-weight: 400;
        }
    }
    .first {
        margin-right: 150px;
        font-size: 20px;
        word-spacing: 2px;
        font-weight: 300;
    }
    .second {
        margin-right: 150px;
        font-size: 20px;
        word-spacing: 2px;
        font-weight: 300;
    }

    // phone
    @media only screen 
        and (min-device-width: 350px) 
        and (max-device-width: 650px) 
    {
        margin-top: 0;
        padding: 1.5em;

        .title {
            font-size: 24px;
        }
        .first {
            margin-right: 0;
            font-size: 18px;
        }
        .second {
            margin-right: 0;
            font-size: 18px;
        }
    }
`;

const Stacks = styled(Row)`
    justify-content: space-between;
    font-family: 'Roboto', sans-serif;

    display: flex;
    flex-direction: column;

    > div:first-child {
        flex-grow: 1;

        padding: 2em 5em 2em 5em;
    }
    > div:last-child {
        flex-grow: 1;

        padding: 2em 5em 2em 5em;
    }
`;

const Faqs = styled(ColumnPiece)`
    div {
        cursor: pointer;
        margin-top: 3em;
    }
`;

const CpatPage = () => {
    return (
        <div style={{ color: 'white', backgroundColor: '#333333' }}>
            <SEO title="cpat" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet" /> 

            <Layout>
                <TitlePiece>
                    <p>
                        <span>CPAT: Collaborative Pen-testing &amp; Analysis "Toolkit"</span>
                    </p>
                </TitlePiece>
                <Subtitle>
                    <div>
                        <p>
                            <span className="title">Real-time, distributed</span>
                        </p>
                        <p className="first">
                            Penetration tests are kicked off with reconnaissance commonly relying on OSINT resources. 
                            Relating those data points and keeping track of the work can be challenging. CPAT is a project 
                            that attempts to organize this data, and make operation possible on IoT devices.
                        </p>
                        <p className="second">
                            All while keeping data real-time and distributed across data stores.
                        </p>
                        <p>
                            <div>
                                <a href="https://github.com/meddlin/cpat">
                                    <img src={githubMark} style={{ marginRight: '10px'}} />
                                </a>
                                <a href="https://github.com/meddlin/cpat" style={{ color: 'white' }}>
                                    <span>Github</span>
                                </a>
                            </div>
                        </p>
                    </div>
                    <div>
                        <img src={cpatArch} />
                    </div>
                </Subtitle>
                {/* <Logos>
                    <Row>SignalR, .NET Core</Row>
                    <Row>Kafka, CockroachDB, Elastic</Row>
                    <Row>RPi</Row>
                </Logos> */}
                <StoryExplanation>
                    <p className="title">
                        <span>But why?</span>
                    </p>
                    <p className="first">
                        CPAT started as a naively hopeful academic project born out of a desire to learn more about infosec. 
                        It was a headfirst approach, and although leading the project, I didn't know what I didn't know.
                    </p>
                    <p className="second">
                        A professor in our department caught wind of our ideas and suggested we write a research paper. For a 
                        couple undergrads, this was simultaneously exciting and daunting. However, three months, two 100 hour 
                        weeks, and some incredulous editing later and we had our ticket to IEEE. 
                    </p>

                    <a href="https://ieeexplore.ieee.org/document/7119262" style={{ color: 'white' }}>CPAT Research Paper</a>

                    <p className="third">
                        <i>
                            It's 5 years later. I'm tired of half-heartedly toying with this rough idea. It's time to create 
                            it or move on.
                        </i>
                    </p>
                </StoryExplanation>
                <Stacks>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ marginRight: '150px', flexGrow: 1 }}>
                            <p>
                                <span style={{ fontSize: '35px', fontWeight: 400 }}>Web app "stack"</span>
                            </p>
                            <div>Client-side</div>
                            <ul style={{ listStyle: 'none' }}>
                                <li>React</li>
                                <li>RxJS</li>
                                <li>styled-components</li>
                            </ul>

                            <div>Server</div>
                            <ul style={{ listStyle: 'none' }}>
                                <li>Core API: C#, .NET Core, SignalR</li>
                                <li>OSINT API: Python + OSINT tools</li>
                            </ul>

                            <div>Data Arch: </div>
                            <ul style={{ listStyle: 'none' }}>
                                <li>CockroachDB <i>(primary store)</i></li>
                                <li>Kafka <i>(data stream)</i></li>
                                <li>Elastic <i>(search/analytics)</i></li>
                            </ul>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            <img src={cpatArch} />
                        </div>
                    </div>

                    <hr />
                    <p>
                        <span style={{ fontSize: '35px', fontWeight: 300 }}>Work in Progress | IoT/Headless "stack"</span>
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ flexGrow: 1 }}>
                            <img src={cpatIotArch} />
                        </div>
                        <div style={{ flexGrow: 1, marginLeft: '60px' }}>
                            {/* <p>
                                <span style={{ fontSize: '35px', fontWeight: 400 }}>IoT/Headless "stack"</span>
                            </p> */}
                            <div>Server</div>
                            <ul style={{ listStyle: 'none' }}>
                                <li>Server \ "Core API": C#, .NET Core, SignalR</li>
                                <li>Server \ "OSINT API": Python</li>
                            </ul>

                            <div>Data Arch</div>
                            <ul style={{ listStyle: 'none' }}>
                                <li>CockroachDB <i>(primary store)</i></li>
                                <li>Kafka <i>(data stream)</i></li>
                            </ul>
                        </div>
                    </div>

                    <hr />
                </Stacks>
                {/* <Faqs>
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
                </Faqs> */}
            </Layout>
        </div>
    );
}

export default CpatPage;