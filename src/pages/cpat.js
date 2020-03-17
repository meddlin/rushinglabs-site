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
`;

const Subtitle = styled(ColumnPiece)`
    margin-top: 2em;
    padding: 5em;
    font-family: 'Roboto', sans-serif;
    
    display; flex;
    flex-direction: row;

    > div:first-child {
        flex-shrink: 15;
    }
    > div:last-child {
        flex-grow: 1;
    }
`;

const Logos = styled(ColumnPiece)`

`;

const StoryExplanation = styled(ColumnPiece)`
    padding: 5em;
    font-family: 'Roboto', sans-serif;
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
                        <span style={{ fontSize: '35px', fontWeight: 400 }}>CPAT: Collaborative Pen-testing &amp; Analysis "Toolkit"</span>
                    </p>
                </TitlePiece>
                <Subtitle>
                    <div>
                        <p>
                            <span style={{ fontSize: '35px', fontWeight: 400 }}>Real-time, distributed</span>
                        </p>
                        <p style={{ marginRight: '150px', fontSize: '20px', wordSpacing: '2px', fontWeight: 300 }}>
                            Penetration tests are kicked off with reconnaissance commonly relying on OSINT resources. 
                            Relating those data points and keeping track of the work can be challenging. CPAT is a project 
                            that attempts to organize this data, and make operation possible on IoT devices.
                        </p>
                        <p style={{ marginRight: '150px', fontSize: '20px', wordSpacing: '2px', fontWeight: 300 }}>
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
                    <p>
                        <span style={{ fontSize: '35px', fontWeight: 400 }}>But why?</span>
                    </p>
                    <p style={{ marginRight: '150px', fontSize: '20px', wordSpacing: '2px', fontWeight: 300 }}>
                        CPAT started as a naively hopeful academic project born out of a desire to learn more about infosec. 
                        It was a headfirst approach, and although leading the project, I didn't know what I didn't know.
                    </p>
                    <p style={{ marginRight: '150px', fontSize: '20px', wordSpacing: '2px', fontWeight: 300 }}>
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