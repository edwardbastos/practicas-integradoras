import { Router } from "express";
import UserManager from '../dao/Mongo/managers/userManager.js';

const router = Router();

const usersService = new UserManager();

router.post('/register',async(req,res)=>{
    const {
        firstName,
        lastName,
        email,
        age,
        password
    } = req.body;
    if(!firstName||!email||!password) return res.status(400).send({status:"error",error:"Incomplete values"})
    //Si ya pasó la validación, lo creo
    const newUser = {
        firstName,
        lastName,
        email,
        age,
        password
    }
    const result = await usersService.create(newUser);

    res.send({status:"success",payload:result._id})
})

router.post('/login',async(req,res)=>{
    //Oye, se supone que debe estar registrado ¿no?, entonces hay que buscarlo en la base de datos
    const {email,password} = req.body;
    if(!email||!password) return res.status(400).send({status:"error",error:"Incomplete values"});
    const user = await usersService.getBy({email,password})
    if(!user) return res.status(400).send({status:"error",error:"Incorrect Credentials"});
    //Sólo si ambos se cumplen, le creo una sesión
    req.session.user = user;
    res.send({status:"success",message:"Logueado"})
})

router.get('/logout',async(req,res)=>{
    req.session.destroy(error=>{
        if(error) {
            console.log(error);
            return res.redirect('/');
        }else{
            res.redirect('/')
        }
    })
})

export default router;