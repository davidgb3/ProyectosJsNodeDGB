# Proyecto Upload DATA en Node Js David Gómez Bravo

## **1. Estructura del proyecto**

El proyecto está organizado de la siguiente manera:

```bash
upload-project/
├── controllers/
│   └── uploadController.js
├── public/
│   └── index.html
│   └── scripts/
│       └── main.js
├── routes/
│   └── uploadRoutes.js
├── uploads/
│   └── (aquí se guardarán los archivos subidos)
├── recycle/
│   └── (aquí se guardarán los archivos reciclados)
├── app.js
└── package.json
```

## **2. Implementación del proyecto**

### **2.1 Inicializa el proyecto (Docker)**

Para iniciar el proyecto, ejecuta los siguientes comandos en la terminal:

```bash
docker-compose up --build
```

### **2.2 Configuración del servidor**

El servidor está configurado con Express para manejar las siguientes rutas:

- **Subir archivos**: La ruta `/api/upload` maneja la subida de archivos utilizando `multer`.
- **Listar archivos subidos**: La ruta `/api/files` devuelve una lista de archivos subidos con sus tamaños y fechas de modificación.
- **Listar archivos reciclados**: La ruta `/api/recycle` devuelve una lista de archivos reciclados.
- **Eliminar archivos**: La ruta `/api/:filename` maneja la eliminación de archivos, moviéndolos a la carpeta de reciclaje.
- **Obtener tamaños de carpetas**: La ruta `/api/folderSizes` devuelve el tamaño de las carpetas `uploads` y `recycle`.

### **2.3 Funcionalidad del cliente**

El archivo `public/scripts/main.js` maneja la lógica del cliente para interactuar con el servidor:

- **Subir archivos**: Maneja el envío del formulario de subida y actualiza la lista de archivos.
- **Listar archivos**: Obtiene y muestra la lista de archivos subidos y reciclados.
- **Eliminar archivos**: Mueve los archivos a la carpeta de reciclaje.
- **Mostrar tamaños de carpetas**: Obtiene y muestra el tamaño de las carpetas `uploads` y `recycle` en un gráfico.

### **2.4 Ejecución del servidor**

Para ejecutar el servidor, utiliza el siguiente comando:

```
Después de levantar el contenedor, el servidor estará disponible en `http://localhost:3000`.

Con estos pasos, tendrás un proyecto funcional para subir, listar, eliminar y reciclar archivos, así como para visualizar el espacio ocupado por las carpetas `uploads` y `recycle`.
```