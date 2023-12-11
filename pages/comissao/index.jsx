import { useEffect, useState } from "react";

export default function Comissoes() {
  const [comissoes, setComissoes] = useState([]);

  useEffect(() => {
    async function fetchComissoes() {
      try {
        const response = await fetch(
          `https://mkseguros2-1cc933cf7ab0.herokuapp.com/comissoes`
        );
        const data = await response.json();
        setComissoes(data);
      } catch (error) {
        console.error("Erro ao buscar comissões:", error);
      }
    }

    fetchComissoes();
  }, []);

  return (
    <>
      <div>
        <h2>Comissões</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>CPF</th>
            <th>Data de Venda</th>
            <th>Número da Proposta</th>
            <th>Produto</th>
            <th>Resultado</th>
            <th>Comissão Recebida</th>
            <th>Data Recebimento</th>
            <th>Abrir</th>
          </tr>
        </thead>
        <tbody>
          {comissoes
            .filter((item) => item.apolice)
            .map((item) => (
              <tr key={item._id}>
                <td>{item.apolice.cliente}</td>
                <td>{item.apolice.cpf}</td>
                <td>{item.apolice.data_venda}</td>
                <td>{item.apolice.numero_proposta}</td>
                <td>{item.apolice.produto}</td>
                <td>{item.apolice.resultado}</td>
                <td>{item.valor_recebido}</td>
                <td>{item.data_recebimento}</td>
                <td>
                  <a href={`/comissao/${item._id}`}>Abrir</a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
