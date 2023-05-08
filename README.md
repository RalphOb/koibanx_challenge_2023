![](https://media.licdn.com/dms/image/D561BAQGJVsWV_WRVUQ/company-background_10000/0/1660753536040?e=1684184400&v=beta&t=_hhaxZdN3bvoqvaZoyaAOBvWyJ2fZ-n47NeAPiLhoOU)
# Challenge Backend
### Instrucciones
#### Consigna
- (&#9745)Se desea crear un servicio de carga de excels con validación de formato y notificación de procesamiento.
- El servicio debe presentar una api con un endpoint que permita hacer un upload de un archivo excel el cual tendran una serie de datos.
- Al subir el excel, se deberá retornar un id haciendo referencia a la tarea de carga.
- Se deberá permitir recuperar el estado de dicha tarea la cual permitirá saber si el excel está en estado “pending” si todavía no se está procesando el archivo, “processing” o “done” e informar en “errors” la cantidad de errores encontrados en el archivo.
- Se deberá permitir recuperar los errores del archivo de forma paginada, indicando la fila y columna que ocasionó el error.
Challenge Tecnico de Koibanx

#### Formato de mapeo
Se desea que el formato de mapeo permita pasar del formato tabular del excel al formato de un objeto json. Por ejemplo la tabla:

| Nombre  | Edad | Nums |
|---|---|---|
| Esteban | 30 | 3,8,1,9,100,34,78,32,97,12 |

Bajo el formato de mapeo:

    [
        {name: “string”, age:”number”,nums[number]},
        {name: “string”, age:”number”,nums[number]},    
    ]

Deberá de devolver el objeto:

    [
        {
            name: Esteban
            age: 30
            nums:1,3,8,9,12,32,34,78.97.100
        }
    ]

Los datos deberán respetar el tipo declarado (para el ejemplo: en name poner un string y en age un Number).

Se deberá soportar excels de 20000 líneas sin bloquear la interfaz http y con una cantidad de numeros maxima de 5000 numeros para ordenar

#### Consideraciones:
- El ejercicio debe ser resuelto en Node utilizando express para la interfaz http y
Mongodb como base de datos NoSQL.(Se puede y se recomienda utilizar mongoose
como ORM).
- La API debe respetar formato REST con correcto mapeo de errores.
- Los endpoints deben ser permisionados, no se requiere desarrollar un endpoint de
login.
- La solución deberá publicarse en un repositorio público a elección(Github, Gitlab)
- Se evaluará la calidad de código, testing de funcionalidades, diseño de arquitectura,
y usabilidad de la api.
- La solución deberá poder instalarse trivialmente con npm, cualquier servicio extra
que se necesite para correr la solución deberá estar correctamente justificado.
- Tanto las justificaciones y datos que crea necesarios para el despliegue de la API,
como la documentación para el uso de los endpoints deben encontrarse en un
archivo readme.md en la raíz del proyecto.
- Enviar un mail a tech@koibanx.com con el asunto “challenge” con el link del
repositorio.

