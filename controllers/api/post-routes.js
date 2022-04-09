const router = require("express").Router()
const multer  = require('multer')
const sharp = require('sharp');
const withAuth = require("../../utils/auth");
const posts=require("../../models/posts")
//const upload=require("../../utils/multerMiddleware")
const upload = multer({ dest: './public/images/' })
const { v4: uuidv4 } = require('uuid');

//create post
router.post("/",withAuth, upload.single('image'),async (req,res)=>{
    try{
        const UUID =uuidv4();
        const imagePath="https://group-project-bootleg.herokuapp.com/images/"+UUID+".png"
        console.log("imagePath:"+imagePath);
        console.log(req.files);
        console.log(req.body);
        sharp(req.files.image_input.data)
        .resize(400, 400, {
          fit: sharp.fit.inside,
          withoutEnlargement: true
        })
        .toFile(imagePath);
        posts.create(
            {
                image_url:UUID+".png",
                caption:req.files.image_input.name,
                user_id:req.session.user_id
            }
        )
        res.redirect("/")
    }catch(err){
        console.log(err);
        res.json(err)
    }
});
//delete a post with the given id
router.delete("/",async (req,res)=>{
    try{
        const checkPost=await posts.findByPk(req.body.id)
        if (checkPost.dataValues.user_id==req.session.user_id){
            posts.destroy({
                where:{
                    id:req.body.id
                }
            })
            console.log(req.body.id);
            res.status(200).json()
        }else{
            res.status(500).json()
        }
    }catch(err){
        res.status(500).json(err)
    }
});
module.exports=router
