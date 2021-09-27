const Database = require("../db/config")

module.exports = {
    


    index(req, res){

        const roomId = req.params.room;
        const questionId = req.params.question;
        const action = req.params.action;
        const password = req.body.password;

        
        console.log(`room = ${roomId}, questionId = ${questionId}, action = ${action}, password = ${password}`)
    },

    async create(req, res){
        const db = await Database();
        const question = req.body.question
        const roomId = req.params.room

        db.run(` INSERT into questions (
            title,
            room
            )VALUES( "${question}", "${roomId}")`)

            res.redirect(`/room/${roomId}`)
    }
}
