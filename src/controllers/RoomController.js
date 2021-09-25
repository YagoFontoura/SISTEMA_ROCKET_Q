const Database = require("../db/config")

module.exports = {
   async create(req, res){
        const db = await Database();
        const pass = req.body.password        
        let roomId = "";
        let isRoom = true;
        
        while(isRoom){
            for(var i = 0; i< 6; i++){
                roomId += Math.floor(Math.random() * 10).toString()
            }
//================================================================================

            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)
            if(!isRoom) {
                
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass.toString()}
                )`)
            }
        }
        await db.close()
        
        res.redirect(`/room/${roomId}`)

    },

    open(req, res){
        const roomId = req.params.room
        res.render("room", {roomId: roomId})
    }
}

