import React, { useEffect, useState } from "react";
import { PageHeader, Tabs, Collapse, Spin } from "antd";
import { useHistory, useParams } from "react-router";
import axios from "axios"
import {endpoint} from "../common/contantes";
import "./Detalhe.css";

const {TabPane} = Tabs;
const { Panel } = Collapse;

const Detalhe = () => {
    const [title, setTitle] = useState("");
    const [casos, setCasos] = useState({});
    const [vacinas, setVacinas] = useState({});

    //loading
    const [loadingCasos, setLoadingCasos] = useState(false);
    const [loadingVacinas, setLoadingVacinas] = useState(false);

    const params = useParams();
    const history = useHistory();

    async function getCasos() {
      //o IF é para evitar carregar o servidor com requisições ao back-end
      if (Object.keys(casos).length === 0 ) { 
        setLoadingCasos(true);
        const res = await axios.get(`${endpoint}/cases?country=${params.pais}`)
        if (res.status === 200) {
          console.log(res.data);
          setCasos(res.data);
        }
        setLoadingCasos(false);
      }
    }

    async function getVacinacao() {
      setLoadingVacinas(true);
      const res = await axios.get(`${endpoint}/vaccines?country=${params.pais}`)
      if (res.status === 200) {
        console.log(res.data);
        setVacinas(res.data);
      }
      setLoadingVacinas(false);
    }

    function onChangeTab(activeKey) {
        if (activeKey === "1") getCasos()
        if (activeKey === "2") getVacinacao()
    }

    useEffect(() => {
        getCasos();
    }, []);

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

        <Tabs onChange={onChangeTab} defaultActiveKey="1" >
          <TabPane tab="Casos" key="1" style={{ minHeight: 100 }}>
            <Spin spinning={loadingCasos}>
              <Collapse accordion defaultActiveKey={["0"]}>
                {Object.keys(casos).map((item, index) => {
                  const obj = casos[item];
                  return (
                    <Panel header={item} key={index}>
                      <p>
                        <b>confirmados: </b> {obj.confirmed}
                      </p>
                      <p>
                        <b>Mortes: </b> {obj.deaths}
                      </p>
                      <p>
                        <b>Curados: </b> {obj.recovered}
                      </p>
                    </Panel>
                  );
                })}
              </Collapse>
            </Spin>
          </TabPane>
          <TabPane tab="Vacinação" key="2" style={{ minHeight: 100 }}>
          <Spin spinning={loadingVacinas}>
            <Collapse defaultActiveKey={["0"]}>
              {Object.keys(vacinas).map((item, index) => {
                const obj = vacinas[item];
                return (
                  <Panel header={item} key={index}>
                    <p>
                      <b>População: </b> {obj.population}
                    </p>
                    <p>
                      <b>Expectativa de vida: </b> {obj.life_expectancy}
                    </p>
                    <p>
                      <b>Pessoas vacinadas: </b> {obj.people_vaccinated}
                    </p>
                    <p>
                      <b>Pessoas parcialmente vacinadas: </b> {obj.people_partially_vaccinated}
                    </p>
                  </Panel>
                );
              })}
            </Collapse>
          </Spin>
          </TabPane>
        </Tabs>        
    </div>
}
export default Detalhe;