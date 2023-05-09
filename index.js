const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const mongoose = require('mongoose');
const app = express();

// Configuración de Multer para la carga de archivos
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

// Conexion a la Bd local de Mongo
// Se utiliza en este caso db_challenge_koibanx como base de datos
mongoose.connect('mongodb://127.0.0.1:27017/db_challenge_koibanx',{
    useNewUrlParser: true
  }).then(() => {
    console.log('Conectado a MongoDB');
  }).catch(err => {
    console.error('Error al conectar a MongoDB', err);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', function() {
    console.log('Conexión exitosa a la base de datos');
});

//Esquema para la base de datos en MongoDb
const contentSquema = new mongoose.Schema({
    name: String,
    age: Number,
    nums: [Number]  
},{
    versionKey: false
});

//Generador de referencias únicas.
function generarIdReferencia() {
  return Math.random().toString(36).substr(2, 9);
}

const UserData_Excel = mongoose.model('UserData_Excel', contentSquema);

// Configuracion de Express para peticiones POST
app.use(express.urlencoded({ extended: true }));

// Ruta del formulario en donde se realiz la carga del archivo
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('archivo'), async (req, res) => {
  try {    
    // Lectura y manejo de los datos del archivo xlsx
    const excelFile = xlsx.read(req.file.buffer);
    const spreadSheet = excelFile.Sheets[excelFile.SheetNames[0]];
    const dataExcel = xlsx.utils.sheet_to_json(spreadSheet);
    const data = dataExcel.map((row)=>({
      name : row.nombre,
      age: row.edad,
      nums: row.nums.split(',').map(Number).sort((a,b)=>a-b)
    }));
    //Inserción de los datos dentro de la base de datos en la collecion userdata_excel's
    await UserData_Excel.insertMany(data);
    const idReferencia = generarIdReferencia();

    res.json(idReferencia);

  } catch (err) {

    const excelFile = xlsx.read(req.file.buffer);
    const spreadSheet = excelFile.Sheets[excelFile.SheetNames[0]];
    const dataExcel = xlsx.utils.sheet_to_json(spreadSheet);
    const data = dataExcel.map((row)=>({
      name : row.nombre,
      age: row.edad,
      nums: row.nums.split(',').map(Number).sort((a,b)=>a-b)
    }));

    //Validacion de los campos dentro del objeto obtenido del archivo xlsx
    const errors = [];
    data.forEach((row, index) => {
      if (typeof row.name !== 'string') {
        errors.push(`Error en la fila ${index + 1}: El campo Nombre debe ser un string.`);
      }
      if (typeof row.age !== 'number') {
        errors.push(`Error en la fila ${index + 1}: El campo Edad debe ser un número.`);
      }
      if (!/^(\d+,)*\d+$/.test(row.nums)) {
        errors.push(`Error en la fila ${index + 1}: El campo Nums debe ser una lista de números separados por comas.`);
      }
    });
    //Devuelve la cadena de errores encontrados con el numero de fila y campo
    res.json(errors);
  }
});

// Inicia el servidor
app.listen(3000, function () {
  console.log('Servidor iniciado en el puerto 3000');
});
