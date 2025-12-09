# 🤖 Asistente Virtual Web – Azure Foundry + Static Web Apps

Este proyecto implementa un **asistente virtual web** utilizando el modelo **GPT-4o-mini** a través de **Microsoft Azure AI Foundry**, desplegado como una **Azure Static Web App**.

La aplicación permite interactuar con un modelo de lenguaje de Azure desde una interfaz web sencilla, moderna y completamente serverless.

---

## 🧠 Tecnologías utilizadas

- **Azure AI Foundry**
  - Modelo: `gpt-4o-mini`
- **Azure Static Web Apps**
- **JavaScript (Frontend Web)**
- **GitHub Actions (CI/CD)**
- **HTML / CSS**

---

## 🚀 Funcionamiento general

1. El usuario escribe un mensaje en la interfaz web.
2. El frontend envía la solicitud al endpoint de **Azure AI Foundry**.
3. El modelo `gpt-4o-mini` procesa la entrada.
4. La respuesta es devuelta y mostrada en tiempo real en la web.

Todo el flujo se ejecuta **sin servidor backend propio**, aprovechando los servicios administrados de Azure.

---

## 🔐 Variables de entorno

Las variables de conexión con Azure **NO están en el repositorio**.  
Se configuran directamente en **Azure Static Web Apps**.

### Variables requeridas en Azure:

| Variable             | Descripción |
|----------------------|------------|
| `FOUNDRY_API_KEY`    | Clave del recurso de Azure AI Foundry |
| `FOUNDRY_ENDPOINT`   | Endpoint del servicio Foundry |
| `FOUNDRY_MODEL`      | Modelo utilizado (ej. `gpt-4o-mini`) |

📌 **Importante:**  
Estas variables **NO se definen en GitHub Secrets**, solo en el portal de Azure.

---

## 🔁 CI / CD (Despliegue automático)

El despliegue se realiza mediante **GitHub Actions** usando el workflow:


El **único secret en GitHub** es el generado automáticamente por Azure:

- **`AZURE_STATIC_WEB_APPS_API_TOKEN_****`**

Este token permite a GitHub Actions desplegar la aplicación en Static Web Apps.

➡️ No contiene claves de IA ni datos sensibles del modelo.

---

## 🧪 Requisitos previos

- Suscripción activa de **Azure** (Student o Pay-As-You-Go)
- Recurso de **Azure AI Foundry** creado
- Recurso de **Azure Static Web Apps**
- GitHub conectado a Azure

---

## ▶️ Despliegue en Azure (resumen)

1. Crear recurso **Azure AI Foundry**
2. Crear implementación con el modelo `gpt-4o-mini`
3. Crear **Static Web App** y vincular el repositorio
4. Configurar variables de entorno en Azure (Foundry)
5. Push al branch `main` 🚀

---

## 📸 Capturas (opcional)

> Puedes agregar aquí screenshots de:
> - La interfaz del asistente
> - El recurso en Azure
> - Variables de entorno configuradas

---

## 📌 Notas importantes

- El proyecto **no expone la API Key en el frontend**
- El modelo y endpoint pueden cambiarse sin tocar código
- Ideal como base para:
  - Chatbots educativos
  - Asistentes internos
  - Pruebas con Azure OpenAI / Foundry

---

## 👨‍💻 Autor

**Omar Valencia Cruz**  

---

## 📄 Licencia

Este proyecto se distribuye con fines educativos y de demostración.


