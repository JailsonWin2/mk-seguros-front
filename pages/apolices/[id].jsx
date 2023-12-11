import TabelaPequena from "@/components/TabelaPequena";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ModalComissao from "@/components/ModalComissao";

function DetalhesApolice() {
  const router = useRouter();
  const { id } = router.query;
  const [apolice, setApolice] = useState({});
  const [comissoes, setComissoes] = useState([]);

  useEffect(() => {
    try {
      async function fetchApolice() {
        if (!id) return; // Se o id não estiver definido, não faça nada
        const response = await fetch(
          `https://mkseguros2-1cc933cf7ab0.herokuapp.com/apolices/${id}`
        );
        const data = await response.json();
        setApolice(data);
      }
      fetchApolice();
    } catch (error) {
      router.push("/apolices");
      alert("Não foi possível carregar a apólice");
    }
  }, [id]); // Adicione id como uma dependência

  useEffect(() => {
    async function fetchComissoesPorApolice() {
      if (!id) return; // Se o id não estiver definido, não faça nada
      const response = await fetch(
        `https://mkseguros2-1cc933cf7ab0.herokuapp.com/comissoes/apolice?apolice=${id}`
      );
      const data = await response.json();
      console.log("data:", data);
      setComissoes(data); //Trazendo Vazio
      console.log("id:", id);
    }
    fetchComissoesPorApolice();
  }, [id]); // Adicione id como uma dependência

  async function excluirApolice() {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta apólice?"
    );
    if (confirmDelete) {
      const response = await fetch(
        `https://mkseguros2-1cc933cf7ab0.herokuapp.com/apolices/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Apólice excluída com sucesso!");
        // Redirect to a success page or perform any other action
        router.push(`/apolices`);
      } else {
        // Handle error case
        console.error("Falha ao excluir apólice");
      }
    }
  }

  function editarApolice() {
    router.push(`/apolices/editar/${id}`);
  }

  return (
    <div>
      <h2>Detalhes da Apólice {id}</h2>
      <p>Cliente: {apolice.cliente}</p>
      <p>CPF: {apolice.cpf}</p>
      <p>
        Data da Venda:{" "}
        {new Date(apolice.data_venda).toLocaleString("pt-BR", {
          dateStyle: "short",
        })}
      </p>

      <p>Comissão total: {apolice.comissao}</p>
      <p>
        Comissao Recebida:{" "}
        {Array.isArray(comissoes)
          ? comissoes.length > 0
            ? comissoes.reduce(
                (total, comissao) => total + comissao.valor_recebido,
                0
              )
            : 0
          : "Comissões não disponíveis"}
      </p>

      {comissoes.length > 0 && <TabelaPequena comissoes={comissoes} />}

      <button onClick={excluirApolice}>Excluir apolice</button>
      <button onClick={editarApolice}>Editar apolice</button>
      <ModalComissao apolice={id} />
    </div>
  );
}

export default DetalhesApolice;
