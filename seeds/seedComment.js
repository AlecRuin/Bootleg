const {comment} = require("../models")

const commentData = [
    {
        content:"Thats definetly SOMETHING programming",
        user_id:2,
        post_id:1
    },
    {
        content:"lame meme dude",
        user_id:1,
        post_id:1
    }
]
const seedComment= ()=>comment.bulkCreate(commentData)
module.exports=seedComment