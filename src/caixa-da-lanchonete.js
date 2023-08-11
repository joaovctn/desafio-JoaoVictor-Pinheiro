class CaixaDaLanchonete {
    constructor() {
      this.cardapio = {
        'cafe': { descricao: 'Café', valor: 3.00 },
        'chantily': { descricao: 'Chantily (extra do Café)', valor: 1.50 },
        'suco': { descricao: 'Suco Natural', valor: 6.20 },
        'sanduiche': { descricao: 'Sanduíche', valor: 6.50 },
        'queijo': { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        'salgado': { descricao: 'Salgado', valor: 7.25 },
        'combo1': { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        'combo2': { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
      };
  
      this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
    }
  
    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasDePagamento.includes(formaDePagamento)) {
          return 'Forma de pagamento inválida!';
        }
      
        if (itens.length === 0) {
          return 'Não há itens no carrinho de compra!';
        }
      
        let total = 0;
        const itensPrincipais = new Set();
        const itensExtras = new Set();
      
        for (const itemInfo of itens) {
          const [codigo, quantidade] = itemInfo.split(',');
          const item = this.cardapio[codigo];
      
          if (parseInt(quantidade) === 0) {
            return 'Quantidade inválida!';
          }
      
          if (!item) {
            return 'Item inválido!';
          }
      
          if (item.descricao.includes('extra')) {
            itensExtras.add(codigo);
          } else {
            itensPrincipais.add(codigo);
          }
      
          total += item.valor * parseInt(quantidade);
        }
      
        for (const codigoExtra of itensExtras) {
          const codigoPrincipal = codigoExtra.split(',')[0];
      
          if (!itensPrincipais.has(codigoPrincipal)) {
            return 'Item extra não pode ser pedido sem o principal';
          }
        }
      
        if (formaDePagamento === 'dinheiro') {
          total *= 0.95; // Aplica desconto de 5% no pagamento em dinheiro
        } else if (formaDePagamento === 'credito') {
          total *= 1.03; // Aplica acréscimo de 3% no pagamento a crédito
        }
      
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }      
    }
export { CaixaDaLanchonete };
