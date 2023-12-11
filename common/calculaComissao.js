export default function getTotalComissaoRecebida(id, comissoes) {
  const comissoesDaApolice = comissoes.filter(
    (c) => c.apolice && c.apolice._id === id
  );
  const totalComissaoRecebida = comissoesDaApolice.reduce(
    (total, comissao) => total + comissao.valor_recebido,
    0
  );
  return totalComissaoRecebida;
}
