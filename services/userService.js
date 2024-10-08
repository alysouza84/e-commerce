// ./services/userService.js
const auth = require('../auth');
const db = require('../models');
const bcrypt = require('bcryptjs');


class UserService{
    constructor(UserModel){
        this.User = UserModel;
    }

    //Cria um novo registro de usuário, contendo email, data de nascimento e senha
    async create(email, data_nasc, password){
        try{

            const salt = await bcrypt.genSalt(10); 
            const hashedPassword = await bcrypt.hash(password, salt);
    
            const newUser = await this.User.create({
                email: email,
                data_nasc: data_nasc,
                password: hashedPassword 
            });
    
            return newUser ? newUser : null;
        }
        catch (error){
            throw error;
        }
    }

    //Lista todos os usuários cadastrados (Requer autenticação com token)
    async findAll()
    {
        try{
            const AllUsers = await this.User.findAll();
            return AllUsers? AllUsers : null;
        }
        catch(error){
            throw error;
        }

    }

    //Procura um usuário no banco de dados através do seu ID
    async findById(id){
        try{
            const User = await this.User.findByPk(id);
            return User? User: null;
        }
        catch(error){
            throw error;
        }

    }

    //Validação de login de email e senha, gerando o token necessário para outros métodos do sistena
    async login(email, password){
        try{
            const User = await this.User.findOne({
                where : {email}
            });

            if(User){ 
                const passwordMatch = await bcrypt.compare(password, User.password);
                
                if(passwordMatch){
    
                    const token = await auth.generateToken(User);
                    User.dataValues.Token = token;
                    User.dataValues.password = ''; 
                    return User;
                } else {
    
                    return null;
                }
            }
            return null; 
        }
        catch(error){
            throw error;
        }
    }
}

module.exports = UserService;