// controllers/uploadController.js
import fs from "fs";
import fsPromises from "fs/promises";
import multer from "multer";
import path from "path";

// Configuración de Multer: almacenamiento y nombres de archivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Carpeta donde se guardarán los archivos subidos
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    // Guardamos el archivo con un nombre único basado en la fecha y el nombre original
    // cb(null, `${Date.now()}-${file.originalname}`);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Controlador para subir archivo
export const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No se ha subido ningún archivo");
    }
    res.send(`Archivo subido con éxito: ${req.file.filename}`);
  } catch (error) {
    res.status(500).send("Error al subir archivo");
  }
};

// Controlador para listar los archivos subidos
export const listFiles = async () => {
  const uploadsPath = path.join(process.cwd(), "uploads"); // Ajusta la ruta

  try {
    const files = await fsPromises.readdir(uploadsPath); // Ahora usa la versión correcta de readdir()
    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(uploadsPath, file);
        const stats = await fsPromises.stat(filePath); // fs.promises ya está implícito
        return {
          name: file,
          size: (stats.size / 1024 / 1024).toFixed(2), // Tamaño en megabytes
          modified: stats.mtime, // Última modificación
        };
      })
    );
    return fileDetails;
  } catch (error) {
    console.error("Error al obtener archivos:", error);
    return [];
  }
};

// Controlador para listar los archivos reciclados
export const listRecycledFiles = async () => {
  const recycleBinPath = path.join(process.cwd(), "recycle"); // Ajusta la ruta

  try {
    const files = await fsPromises.readdir(recycleBinPath); // Ahora usa la versión correcta de readdir()
    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(recycleBinPath, file);
        const stats = await fsPromises.stat(filePath); // fs.promises ya está implícito
        return {
          name: file,
          size: (stats.size / 1024 / 1024).toFixed(2), // Tamaño en megabytes
          modified: stats.mtime, // Última modificación
        };
      })
    );
    return fileDetails;
  } catch (error) {
    console.error("Error al obtener archivos:", error);
    return [];
  }
};

// Controlador para eliminar un archivo
export const deleteFile = (req, res) => {
  const fileName = req.params.fileName; // Nombre del archivo a eliminar
  const filePath = path.join(process.cwd(), "uploads", fileName);
  const recycleDir = path.join(process.cwd(), "recycle");
  const recyclePath = path.join(recycleDir, fileName);

  // Verificar si la carpeta recycle existe, si no, crearla
  if (!fs.existsSync(recycleDir)) {
    fs.mkdirSync(recycleDir);
  }

  fs.rename(filePath, recyclePath, (err) => {
    if (err) {
      return res.status(500).send(`Error al mover archivo a la papelera: ${fileName}`);
    }
    res.send(`Archivo ${fileName} movido a la papelera con éxito`);
  });
};

function getFolderSize(folderPath) {
  const files = fs.readdirSync(folderPath);
  let totalSize = 0;

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      totalSize += stats.size;
    } else if (stats.isDirectory()) {
      totalSize += getFolderSize(filePath);
    }
  });

  return totalSize;
}

export const storageInfo = (req, res) => {
  const recycleDir = path.join(process.cwd(), "recycle");
  const uploadsDir = path.join(process.cwd(), "uploads");

  const recycleSize = getFolderSize(recycleDir);
  const uploadsSize = getFolderSize(uploadsDir);

  const recycleSizeMB = (recycleSize / 1024 / 1024).toFixed(2);
  const uploadsSizeMB = (uploadsSize / 1024 / 1024).toFixed(2);

  res.json({ recycleSizeMB, uploadsSizeMB });
};

export { upload };
