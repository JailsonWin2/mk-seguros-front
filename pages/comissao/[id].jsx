import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function DetalhesComissao() {
  const router = useRouter();
  const { id } = router.query;
  const [comissao, setComissao] = useState({});

  useEffect(() => {
    async function fetchComissao() {
      const response = await fetch(
        `https://mkseguros2-1cc933cf7ab0.herokuapp.com/comissoes/${id}`
      );
      const data = await response.json();
      setComissao(data);
    }
    if (id) {
      fetchComissao();
    }
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Deseja excluir a comissão?");
    if (confirmDelete) {
      const response = await fetch(
        `https://mkseguros2-1cc933cf7ab0.herokuapp.com/comissoes/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Redirect to a success page or perform any other action
        router.push(`/apolices/${comissao.apolice._id}`);
      } else {
        // Handle error case
        console.error("Failed to delete commission");
      }
    }
  };

  return (
    <div>
      <h2>Detalhes da Comissao {id}</h2>
      <p>Data: {comissao.data_recebimento}</p>
      <p>Valor: {comissao.valor_recebido}</p>
      <button onClick={handleDelete}>Excluir Comissão</button>
    </div>
  );
}

export default DetalhesComissao;
