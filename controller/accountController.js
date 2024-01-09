const mongoose = require('mongoose')
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Schema = {
    register: async (req, res) => {
        const { name, email, password, confirmpassword } = req.body

        if (!name) {
            return res.status(422).json({ msg: 'O nome é obrigatório' })
        }

        if (!email) {
            return res.status(422).json({ msg: 'O email é obrigatório' })
        }

        if (!password) {
            return res.status(422).json({ msg: 'O password é obrigatório' })
        }

        if (password != confirmpassword) {
            return res.status(422).json({ msg: 'As senhas não combinam!' })
        }

        // check if user exists
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return res.status(422).json({ msg: 'Email já existente tente outro!' })
        }

        // create password
        const salt = await bcrypt.genSalt(12)
        const passwordhash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: passwordhash
        })

        try {
            await user.save()

            res.status(201).json({ msg: "Usuário criado com sucesso! " })

        } catch (error) {
            res.status(500).json({ msg: "Ocorreu um erro no servidor, tente novamente mais tarde!" })
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body

        if (!email) {
            return res.status(422).json({ msg: 'O email é obrigatório' })
        }

        if (!password) {
            return res.status(422).json({ msg: 'O password é obrigatório' })
        }

        // check if user exists
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(422).json({ msg: 'Usuário não existe!' })
        }

        // check the password
        const checkPassword = await bcrypt.compare(password, user.password)


        if (!checkPassword) {
            return res.status(422).json({ msg: 'Senha errada!' })
        }

        try {
            const secret = process.env.secret

            const token = jwt.sign(
                {
                    id: user._id
                },
                secret
            )
            

            res.status(200).json({ msg: "Autenticação realizada com sucesso!", token })

        } catch (error) {
            res.status(500).json({ msg: "Ocorreu um erro no servidor, tente novamente mais tarde!" })
        }
    },

    user: async (req, res) => {
        const id = req.params.id

        const user = await User.findById(id, '-password')

        if(!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" })
        }

        res.status(200).json({ user })

    },



    checkToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(!token) {
            return res.status(201).json({ msg: "Acesso negado!" })
        }

        try {
            const secret = process.env.SECRET

            jwt.verify(token, secret)

            next()
        } catch (error) {
            res.status(400).json({ msg: 'token inválido!' })
        }
    }
}



module.exports = Schema