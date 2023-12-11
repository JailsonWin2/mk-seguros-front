import React, { useState } from "react";
import Modal from "react-modal";

//Modal.setAppElement("#root"); // Substitua '#root' pelo elemento raiz do seu aplicativo

export default function ModalComissao(apolice) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState("");
  const [valor, setValor] = useState("");

  const cadastraComissao = async (data, valor) => {
    try {
      const response = await fetch(
        "https://mkseguros2-1cc933cf7ab0.herokuapp.com/comissoes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data_recebimento: data,
            valor_recebido: valor,
            apolice: apolice.apolice.toString(),
          }),
        }
      );

      if (response.ok) {
        alert("Comissão cadastrada com sucesso!");
        window.location.reload(); // Atualiza a página
      } else {
        alert("Erro ao cadastrar comissão");
      }
    } catch (error) {
      console.error("Erro ao cadastrar comissão:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cadastraComissao(data, valor);
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Cadastrar Comissao</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label>
            Data:
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </label>
          <label>
            Valor:
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </label>
          <button type="submit">Cadastrar</button>
        </form>
      </Modal>
    </div>
  );
}
