import React from "react";
import styles from "./styles.module.scss";

const TabelaPequena = ({ comissoes }) => {
  if (!Array.isArray(comissoes)) {
    return <p>Não há comissões disponíveis</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Data Recebimento</th>
          <th>Valor Recebido</th>
          <th>Detalhes</th>
        </tr>
      </thead>
      <tbody>
        {comissoes.map((comissao) => (
          <tr key={`${comissao.data_recebimento}-${comissao.valor_recebido}`}>
            <td>
              {new Date(comissao.data_recebimento).toLocaleString("pt-BR", {
                dateStyle: "short",
              })}
            </td>
            <td>{comissao.valor_recebido}</td>
            <td>
              <a href={`/comissao/${comissao._id}`}>Abrir</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaPequena;
