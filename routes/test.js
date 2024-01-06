const router = require('express').Router()

router.get("/", (req, res) => {
    res.send("Chamou?")
})

router.get("/testou", (req, res) => {
    res.send("testando")
})



module.exports = router