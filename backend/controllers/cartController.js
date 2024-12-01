class CartController{
    constructor(CartService){
        this.cartService = CartService;
    }

    //Adiciona itens ao carrinho, recebendo os atributos do body da requisição
    async addToCart(req,res){
        const {userID, itemID, itemPrice, quantity} = req.body;

        try{
            const newCart = await this.cartService.add(userID, itemID, itemPrice, quantity);
            res.status(200).json(newCart);
        }catch(error){
            res 
                .status(500)
                .json({error: 'Ocorreu um erro ao adicionar o item no carrinho.'});
        }
    }

    //Remove itens do carrinho, recebendo o id de usuário para identificação do carrinho de compras e id do produto a ser removido
    async removeFromCart(req,res){
        const {itemID} = req.params;
        const {userID} = req.body;
        try {
            const removeCart = await this.cartService.remove(userID, itemID);

            if (!removeCart) {
                return res.status(404).json({ error: 'Item não encontrado.' });
            }

            return res.status(200).json({message: 'Item removido com sucesso.' }); 
            
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao remover o item do carrinho.'})
        }
    }

    //Lista todos os itens do carrinho de compras do usuário
    async listAllItems(req, res){
        const {userID} = req.body;
        try{
            const result = await this.cartService.listAllItems(userID);
            res.status(200).json(result);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar todos os itens do carrinho.'});
        }
    }
}

module.exports = CartController;