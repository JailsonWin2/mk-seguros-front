import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import getTotalComissaoRecebida from "@/common/calculaComissao";
import axios from "axios";

function Apolices() {
  const [apolices, setApolices] = useState([]);
  const [comissoes, setComissoes] = useState([]);

  const [limite, setLimite] = useState(10);
  const [pagina, setPagina] = useState(1);

  const [filtroEmissao, setFiltroEmissao] = useState("todas");
  const [filtroNome, setFiltroNome] = useState("");

  async function fetchApolices() {
    try {
      const response = await axios.get(
        `https://mkseguros2-1cc933cf7ab0.herokuapp.com/apolices/emissao?emissao=${filtroEmissao}&limite=${limite}&pagina=${pagina}${filtroNome}`
      );
      setApolices(response.data);
    } catch (error) {
      console.error("Error fetching apolices:", error);
    }
  }

  useEffect(() => {
    if (filtroNome === "&cliente=") {
      setFiltroNome("");
    }
    fetchApolices();
  }, [filtroEmissao, limite, pagina, filtroNome]);

  useEffect(() => {
    async function fetchComissoes() {
      try {
        const response = await fetch(
          "https://mkseguros2-1cc933cf7ab0.herokuapp.com/comissoes"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setComissoes(data);
      } catch (error) {
        console.error("Error fetching comissoes:", error);
      }
    }
    fetchComissoes();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div>
          <label htmlFor="filtroEmissao">Filtrar por Emissão:</label>
          <select
            id="filtroEmissao"
            value={filtroEmissao}
            onChange={(event) => {
              setFiltroEmissao(event.target.value);
            }}
          >
            <option value="todas">Todos</option>
            <option value="true">Emitida</option>
            <option value="false">Não Emitida</option>
          </select>
        </div>

        <div>
          <label htmlFor="pages">Itens por pagina:</label>
          <select
            id="pages"
            value={limite}
            onChange={(event) => {
              setLimite(event.target.value);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={50}>100</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">Busca pelo nome:</label>
          <input
            type="text"
            id="name"
            onChange={(event) => {
              setFiltroNome("&cliente=" + event.target.value);
            }}
          />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Comissão</th>
              <th>CPF</th>
              <th>Data de Venda</th>
              <th>Emissão</th>
              <th>Forma de Pagamento</th>
              <th>Número da Proposta</th>
              <th>Prêmio Bruto</th>
              <th>Prêmio Líquido</th>
              <th>Produto</th>
              <th>Resultado</th>
              <th>Comissão Recebida</th>
              <th>Abrir</th>
            </tr>
          </thead>
          <tbody>
            {apolices.map((apolice) => (
              <tr key={apolice._id}>
                <td>{apolice.cliente}</td>
                <td>{apolice.comissao}</td>
                <td>{apolice.cpf}</td>
                <td>
                  {new Date(apolice.data_venda).toLocaleString("pt-BR", {
                    dateStyle: "short",
                  })}
                </td>
                <td>{apolice.emissao}</td>
                <td>{apolice.forma_pagamento}</td>
                <td>{apolice.numero_proposta}</td>
                <td>{apolice.premio_bruto}</td>
                <td>{apolice.premio_liquido}</td>
                <td>{apolice.produto}</td>
                <td>{apolice.resultado}</td>
                <td>{getTotalComissaoRecebida(apolice._id, comissoes)}</td>
                <td>
                  <a href={`/apolices/${apolice._id}`}>Abrir</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.paginacao}>
          <button
            onClick={() => {
              if (pagina > 1) {
                console.log("Voltando pagina: ", pagina);
                setPagina(pagina - 1);
              }
            }}
          >
            Anterior
          </button>
          {pagina}
          <button
            onClick={() => {
              console.log("Avançando pagina: ", pagina);
              setPagina(pagina + 1);
            }}
          >
            Próxima
          </button>
        </div>
      </div>
    </>
  );
}

export default Apolices;
