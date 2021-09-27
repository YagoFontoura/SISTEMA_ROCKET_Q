const Database = require("../db/config")

module.exports = {
    


    async index(req, res){
        const db = await Database()
        const roomId = req.params.room;
        const questionId = req.params.question;
        const action = req.params.action;
        const password = req.body.password;

        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
        if(verifyRoom.pass == password) {
            if(action == "delete"){

                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)


            }else if (action == "check") {   
                
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)

            }
            res.redirect(`/room/${roomId}`)
          }else {
              res.render('passincorrect', {roomId: roomId})
          }
        
    },

    async create(req, res){
        const db = await Database();
        const question = req.body.question
        const roomId = req.params.room
        const questions = question.toString();
        if(questions === ""){
            res.redirect(`/room/${roomId}`)
        }else {
             db.run(` INSERT into questions (
                 title,
                 room,
                 read
                 )VALUES( "${questions}", "${roomId}", 0)`)
     
                 res.redirect(`/room/${roomId}`)

         }
     }
}
