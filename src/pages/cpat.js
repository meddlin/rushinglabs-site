import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const CpatPage = () => {
    return (
        <div>
            <SEO title="cpat" />

            <Layout>
                <h1>CPAT</h1>

                <Link to="https://github.com/meddlin/cpat">Project Repo</Link>
            </Layout>
        </div>
    );
}

export default CpatPage;