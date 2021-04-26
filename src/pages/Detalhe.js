import React, { useEffect, useState } from "react";
import { PageHeader } from "antd";
import "./Detalhe.css";
import { useHistory, useParams } from "react-router";

const Detalhe = () => {
    const [title, setTitle] = useState("");
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        if (params.pais) {
            setTitle(params.pais)
        }
    }, [params]);

    return <div>
        <PageHeader
            className="site-page-header"
            onBack={() => history.goBack()}
            title={title}
            subTitle="Casos e Vacinação"
        />
    </div>
}
export default Detalhe;