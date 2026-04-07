# 📊 Guía de Estructura de Google Sheets

Esta documentación explica cómo configurar la hoja de Google Sheets vinculada al prototipo para que los cambios se reflejen correctamente en la web.


---

## 📂 Organización de Pestañas (Hojas)
La hoja debe contener exactamente **5 pestañas** con los siguientes nombres:

1.  **`Perfil`**: Datos generales del usuario principal.
2.  **`Posts`**: Publicaciones del muro de noticias.
3.  **`Info`**: Información de contacto y detalles personales.
4.  **`Fotos`**: Galería de imágenes.
5.  **`Chat`**: Diálogos del sistema de mensajería interactivo.

---

## 📝 Detalle de Columnas por Pestaña

Para que el sistema detecte los datos, las columnas deben tener los siguientes encabezados (insensible a mayúsculas/minúsculas):

### 1. Pestaña: `Perfil`
| Columna | Descripción | Ejemplo |
| :--- | :--- | :--- |
| **Nombre** | El nombre de usuario que se mostrará en el perfil y posts. | Leo_Evergreen |
| **Foto Perfil** | URL directa de la imagen del avatar. | `https://lh3.googleusercontent.com/...` |

### 2. Pestaña: `Posts`
| Columna | Descripción | Ejemplo |
| :--- | :--- | :--- |
| **Texto** | El contenido escrito del post (opcional si hay imagen). | "¡Hoy fue un día increíble de exploración!" |
| **Imagen URL** | URL directa de la imagen del post. | `https://i.ibb.co/imagen.png` |

### 3. Pestaña: `Info`
| Columna | Descripción | Ejemplo |
| :--- | :--- | :--- |
| **Titulo** | Categoría de la información. | "Colegio" o "Sobre mí" |
| **Texto** | Valor de la categoría. | "Primaria N° 15" |
| **Icono URL** | (Opcional) URL de un icono personalizado. Si se deja vacío, usa uno genérico. | `https://ejemplo.com/estudiante.png` |

### 4. Pestaña: `Fotos`
| Columna | Descripción | Ejemplo |
| :--- | :--- | :--- |
| **Imagen URL** | URL directa de la foto para la cuadrícula y el carrusel. | `https://i.ibb.co/foto-galeria.png` |

### 5. Pestaña: `Chat`
| Columna | Descripción | Ejemplo |
| :--- | :--- | :--- |
| **Quien** | Quién envía el mensaje. Si contiene **"Receptor"**, es un mensaje enviado por el usuario (derecha). Cualquier otro valor (como "Emisor") es recibido (izquierda). | Emisor |
| **Texto** | El contenido del mensaje de chat. | "Hola, ¿cómo estás?" |
| **Sospechoso** | Si escribes **"SOSPECHOSO"**, el sistema mostrará una alerta de advertencia al hacer clic en este mensaje (solo para mensajes recibidos). | SOSPECHOSO |

---

## 💡 Consejos de Uso
*   **URLs de Imágenes**: Utiliza enlaces directos a imágenes (que terminen en `.jpg`, `.png`, o enlaces de Google Photos/Drive públicos).
*   **Actualizaciones**: No necesitas volver a subir el código a GitHub cada vez que cambies el Google Sheet. Los cambios se reflejarán automáticamente al recargar la página web.
*   **Filas Vacías**: Trata de no dejar filas vacías entre datos, el sistema procesará hasta que encuentre el final de la lista.
