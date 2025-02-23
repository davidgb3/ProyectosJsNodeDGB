// Obtener referencias
const uploadForm = document.getElementById("uploadForm");
const fileList = document.getElementById("fileList");
const recicledList = document.getElementById("recicledList");
const chartCanvas = document.getElementById("spaceCanvas");

// Función para listar los archivos subidos
async function fetchFiles() {
  const response = await fetch("/api/files");
  if (!response.ok) {
    console.error("Error al obtener los archivos");
    return;
  }
  const files = await response.json();
  console.log(files);
  fileList.innerHTML = ""; // Limpiar la lista antes de renderizar

  files.forEach((file) => {
    if (!file || !file.name) {
      console.error("Archivo inválido:", file); // 🛠️ Detectar valores inesperados
      return;
    }

    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow-sm";
    li.innerHTML = `
      <span>${file.name} | ${file.size} megabytes | Modificado: ${new Date(file.modified).toLocaleString()}</span>
      <button data-filename="${file.name}" class="bg-red-500 text-white rounded-lg px-4 py-2">Reciclar</button>
    `;
    fileList.appendChild(li);
  });

  // Agregar eventos de eliminación
  document.querySelectorAll("button[data-filename]").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const fileName = e.target.dataset.filename;
      await deleteFile(fileName);
      fetchFiles(); // Actualizar la lista
    });
  });
};

// Función para listar los archivos reciclados
async function fetchRecicledFiles() {
  const response = await fetch("/api/recycle");
  if (!response.ok) {
    console.error("Error al obtener los archivos");
    return;
  }
  const files = await response.json();
  console.log(files);
  recicledList.innerHTML = ""; // Limpiar la lista antes de renderizar

  files.forEach((file) => {
    if (!file || !file.name) {
      console.error("Archivo inválido:", file); // 🛠️ Detectar valores inesperados
      return;
    }

    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow-sm";
    li.innerHTML = `
      <span>${file.name} | ${file.size} megabytes | Modificado: ${new Date(file.modified).toLocaleString()}</span>
    `;
    recicledList.appendChild(li);
  });
};

// Función para eliminar archivo
async function deleteFile(fileName) {
  const response = await fetch(`/api/${fileName}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.error(`Error al eliminar el archivo: ${fileName}`);
  }
}

// Manejador de envío del formulario de subida
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(uploadForm);
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    uploadForm.reset(); // Limpiar el formulario
    fetchFiles(); // Actualizar la lista
  } else {
    console.error("Error al subir el archivo");
  }
});

// Función para obtener el tamaño de las carpetas y mostrar un gráfico
async function getFolderSizes() {
  try {
    const response = await fetch('/api/folderSizes');
    if (!response.ok) {
      console.error('Error al obtener el tamaño de las carpetas');
      return;
    }
    const { recycleSizeMB, uploadsSizeMB } = await response.json();

    const ctx = document.getElementById('spaceChart').getContext('2d');
    
    // Destruir el gráfico anterior si existe
    if (window.folderChart) {
      window.folderChart.destroy();
    }
    
    // Crear nuevo gráfico y guardarlo en una variable global
    window.folderChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Recycle: ' + recycleSizeMB + ' (MB)', 'Uploads: ' + uploadsSizeMB + ' (MB)'],
        datasets: [{
          data: [recycleSizeMB, uploadsSizeMB],
          backgroundColor: ['#ffa500', '#36A2EB'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Espacio Ocupado por Carpetas'
          }
        }
      }
    });
  } catch (error) {
    console.error('Error al crear el gráfico:', error);
  }
}

// Cargar la lista de archivos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  fetchFiles();
  fetchRecicledFiles();
  getFolderSizes();
});
