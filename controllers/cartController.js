class CartController{
    constructor(CartService){
        this.cartService = CartService;
    }
    async createCart(req,res){
        const {userID, items} = req.body;
        try{
            const newCart = await this.cartService.create(userID, items);
            res.status(200).json(newCart);
            res.send();
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao gravar o novo carrinho.'});
        }
    }

    async listAllItems(req, res){
        try{
            const AllItens = await this.cartService.listCartItems();
            res.status(200).json(AllItens);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar todos os itens.'});
        }
    }

    async addItem(req, res){
        const { userID, newItem } = req.body;

        try {
            const updatedItems = await cartService.addItem(userID, newItem);
            if (updatedItems) {
                return res.status(200).json({
                    message: 'Item adicionado com sucesso',
                    items: updatedItems
                });
            } else {
                return res.status(404).json({ message: 'Carrinho não encontrado' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao adicionar item', error: error.message });
        }
    }

    async deleteItem(req, res){
        const { userID, itemToRemove } = req.body;

        try {
            const updatedItems = await cartService.removeItem(userID, itemToRemove);
            if (updatedItems) {
                return res.status(200).json({
                    message: 'Item removido com sucesso',
                    items: updatedItems
                });
            } else {
                return res.status(404).json({ message: 'Carrinho não encontrado' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao remover item', error: error.message });
        }
    }
}

module.exports = CartController;