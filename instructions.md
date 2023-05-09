# Intrucciones y justificaciones
### Dependencias requeridas
Para la realizacion de este servicio se ocupan las siguiente librerias de npm
- **mongoose**
  Se utiliza para la conexion a la base de datos y sus operaciones dentro de ella
- **multer**
- Se utiliza para la carga de archivos, ya sea en una carpeta dentro del servidor o en memoria
- **xlsx**
  Se utiliza para el manejo de archivos .xlsx

### Pasos de instalación

1. Se crea un directorio para alojar el proyecto, se navega hacia el y se crea el proyecto
   ```
   mkdir "nombre_proyecto"
   cd "nombre_proyecto"
   npm init
   ```
2. Se cargan las dependencias
   ```
   npm install express mongoose multer xlsx
   ```
3. Se cargan los archivos del proyecto y se inicia el servidor
   ```
   node index.js
   ```

###Justificaciones

 - [X] **Uso de Multer**
    Se hace uso de la dependencia de multer debido a que funciona como manejador de _multipar/form-data_, utilizado principalmente para la subida de archivos ya sea de forma temporal (memory) o en disco (disk).
 - [X] **Uso de xlsx**
    Es una dependencia especializada para el manejo de archivo de tipo xlsx, permitiendo la manipulación de los datos obtenidos, validacion y mapeo de la información
 - [X] **Uso de mongoose**
    Dependencia encargada del modelado de datos orientada a objetos para mongodb y nodejs, puesto que administra las relaciones entre los datos, brinda validación en los schemas y la traduccion de objetos entre el código y MongoDB.

