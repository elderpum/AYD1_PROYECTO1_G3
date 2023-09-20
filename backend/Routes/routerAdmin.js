const express = require("express");
const router = express.Router();
const controllerAdmin = require("../Controllers/controllerAdmin");
const controllerAccess = require("../Controllers/controllerAccess");

//GET
router.get("/estudiantesEje", controllerAdmin.ejemplo);
router.get(
  "/getAllUsers",
  controllerAccess.isAnAdmin,
  controllerAdmin.getAllEstudiantes
);

//POST
router.post("/block" ,controllerAccess.isAnAdmin,controllerAdmin.blockUser);
router.post("/unblock", controllerAccess.isAnAdmin,controllerAdmin.unblockUser);

module.exports = router;
