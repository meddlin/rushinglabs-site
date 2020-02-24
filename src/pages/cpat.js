import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const CpatPage = () => {
    return (
        <div>
            <SEO title="cpat" />

            <Layout>
                <div>
                    <h1>CPAT</h1>
                    <h2>Collaborative Pen-testing &amp; Analysis "Toolkit"</h2>
                    <a href="https://github.com/meddlin/cpat">Github</a>
                </div>
                <div>
                    <p>A (real-time?) distributed system for automating OSINT data.</p>
                    <p>
                        Penetration tests are kicked off with reconnaissance commonly relying on OSINT resources. 
                        Relating those data points and keeping track of the work can be challenging. CPAT is a project 
                        that attempts to organize this data, and make operation possible on IoT devices.
                    </p>
                </div>
                <div>
                    <div>C#, React, RxJS, Python</div>
                    <div>SignalR, .NET Core</div>
                    <div>Kafka, CockroachDB, Elastic</div>
                    <div>RPi</div>
                </div>
                <div>
                    <p>But Why?</p>
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
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <div>
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
                </div>
                <div>
                    <h3>FAQ</h3>
                    <div>
                        <p>Have you heard of Spiderfoot?</p>
                        <p>
                            Yep! and it's great stuff. The idea for CPAT started before I was aware of such projects 
                            (or really any of them), so there is no attempt to compete with Spiderfoot. Ideally, there 
                            would be quite a bit of collaboration/interoperability between the two.
                        </p>
                    </div>
                    <div>
                        <p>What if this works?</p>
                        <p>
                            <ul>
                                <li>CPAT will remain open-source.</li>
                                <li>A business model will appear if it makes sense.</li>
                                <li>It must run on "commodity" hardware (sub-$10k systems</li>
                            </ul>
                        </p>
                    </div>
                    <div>
                        <p>What if it sucks?</p>
                        <p>Then we learn.</p>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default CpatPage;