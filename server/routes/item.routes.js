const router = require('express').Router();
const itemController = require("../controllers/item.controller");

router.get("/getAll", itemController.selectAll)
router.get("/getAllC", itemController.selectAllC)
router.get("/:id",itemController.selectOneida)
router.get("/getC/:id",itemController.selectOnec)
router.post("/addC",itemController.addC)
router.post("/",itemController.addAC)
router.delete("/:id",itemController.remove)
router.put("/:id",itemController.modify)
module.exports = router;
