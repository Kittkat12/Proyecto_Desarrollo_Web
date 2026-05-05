# Actividad Semana 3 - Node JS + Express

Este proyecto corresponde a la actividad de la Semana 3 del curso Desarrollo de Aplicaciones Web.

El objetivo es crear un backend utilizando Node JS y Express para manejar tareas y metas personales.  
Los datos se guardan en arreglos dentro del servidor, por lo que no se utiliza base de datos y la información no persiste cuando se detiene la aplicación.

## Requisitos previos

Antes de ejecutar el proyecto, se debe tener instalado:

- Node JS en versión v24.13.1
- npm
- Git Bash o una terminal
- Postman o Thunder Client para probar los endpoints

## Tecnologías utilizadas

- Node JS
- Express
- Express Generator
- JavaScript

## Instalación del proyecto

Primero se debe clonar el repositorio:

```bash
git clone https://github.com/Kittkat12/Proyecto_Desarrollo_Web.git

1. cd Proyecto_Desarrollo_Web
2. cd backend
3. npm install
4. npm start

Se ejecutara en el siguiente servidor: http://localhost:3000

### Instrucciones: 


Endpoints disponibles

Obtener tareas
GET http://localhost:3000/tasks/getTasks

Agregar tarea
POST http://localhost:3000/tasks/addTask

Ejemplo de body: {
  "name": "Task 4",
  "description": "Description for Task 4",
  "duedate": "2024-07-01"
}
Eliminar tarea: 
DELETE http://localhost:3000/tasks/removeTask/1

Obtener mas metas:
GET http://localhost:3000/goals/getGoals
Agregar metas: 
POST http://localhost:3000/goals/addGoal

Ejemplo de body: 
{
  "name": "Goal 4",
  "description": "Description for Goal 4",
  "duedate": "2024-08-01"
}
Eliminar tarea: DELETE http://localhost:3000/goals/removeGoal/1

Autorización: Authorization: 123456

