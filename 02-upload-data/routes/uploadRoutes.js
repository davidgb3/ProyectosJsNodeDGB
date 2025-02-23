// routes/uploadRoutes.js
import { Router } from "express";
import {
  upload,
  uploadFile,
  listFiles,
  deleteFile,
  listRecycledFiles,
  storageInfo,
} from "../controllers/uploadController.js";

const router = Router();

// Ruta para subir archivo
router.post("/upload", upload.single("file"), uploadFile);

// Ruta para listar los archivos subidos
router.get("/files", async (req, res) => {
  const files = await listFiles();
  res.json(files);
});

// Ruta para listar los archivos reciclados 
router.get("/recycle", async (req, res) => {
  const files = await listRecycledFiles();
  res.json(files);
});

// Ruta para eliminar un archivo
router.delete("/:fileName", deleteFile);

router.get('/folderSizes', storageInfo);

export default router;
