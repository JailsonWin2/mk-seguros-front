import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

function ApoliceForm() {
  const router = useRouter();
  const { id } = router.query;
  const [apolice, setApolice] = useState({
    cliente: "",
    comissao: 0,
    cpf: "",
    data_venda: "",
    emissao: "",
    forma_pagamento: "",
    numero_proposta: 0,
    premio_bruto: 0,
    premio_liquido: 0,
    produto: "",
    resultado: 0,
    seguradora: "",
    vigencia_final: "",
    vigencia_inicio: "",
  });

  useEffect(() => {
    async function fetchApolice() {
      const response = await fetch(
        `https://mkseguros2-1cc933cf7ab0.herokuapp.com/apolices/${id}`
      );
      const data = await response.json();
      setApolice(data);
    }
    if (id) {
      fetchApolice();
    }
  }, [id]);

  const handleChange = (e) => {
    setApolice({ ...apolice, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://mkseguros2-1cc933cf7ab0.herokuapp.com/apolices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apolice),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
    router.push(`/apolices/${id}`);
    alert("Apolice atualizada com sucesso!");
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.content}>
        <label>
          Cliente:
          <input
            type="text"
            name="cliente"
            value={apolice.cliente}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Comissao:
          <input
            type="number"
            name="comissao"
            value={apolice.comissao}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          CPF:
          <input
            type="text"
            name="cpf"
            value={apolice.cpf}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Data de Venda:
          <input
            type="text"
            name="data_venda"
            value={apolice.data_venda}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Emissao:
          <input
            type="text"
            name="emissao"
            value={apolice.emissao}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Forma de Pagamento:
          <input
            type="text"
            name="forma_pagamento"
            value={apolice.forma_pagamento}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Numero da Proposta:
          <input
            type="number"
            name="numero_proposta"
            value={apolice.numero_proposta}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Premio Bruto:
          <input
            type="number"
            name="premio_bruto"
            value={apolice.premio_bruto}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Premio Liquido:
          <input
            type="number"
            name="premio_liquido"
            value={apolice.premio_liquido}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Produto:
          <input
            type="text"
            name="produto"
            value={apolice.produto}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Resultado:
          <input
            type="number"
            name="resultado"
            value={apolice.resultado}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Seguradora:
          <input
            type="text"
            name="seguradora"
            value={apolice.seguradora}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Vigencia Final:
          <input
            type="date"
            name="vigencia_final"
            value={apolice.vigencia_final}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Vigencia Inicio:
          <input
            type="date"
            name="vigencia_inicio"
            value={apolice.vigencia_inicio}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <input className={styles.submit} type="submit" value="Atualizar" />
    </form>
  );
}

export default ApoliceForm;
