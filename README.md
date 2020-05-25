# PROYECTO



- Planificación de rutas a partir de wireframes, requerimientos y mi diseño de BD en MySQL. 

- Creación del entorno de desarrollo.

- Instalación de dependencias, edición del .gitignore, creación .env, .eslintrc.json

- Edición de package.json para script de arranque del módulo "start" y "dev".

- Conexión con mi Base de Datos en DB.js + edición del .env 

- Creación de directorios (middlewares, validations, helpers)



-TRABAJO CON LAS RUTAS DE "USUARIOS", "CONCURSOS", "INSCRIPCIONES" y "VALORACIONES", correspondientes a las tablas de la BD, exceptuando las "VALORACIONES" que se incluyen en la tabla de INSCRIPCIONES (provisionalmente hasta feedback al respecto)


- Importación y exportación de funciones y módulos, uso de módulos externos.
- Utilización de arrays, objetos, destructuring, asincronía.
- Manejo del paso de parámetros, autenticaciones e información envíada a través del "body".
- Inyección de SQL, consultas multitabla.
- Uso de encryptación de contraseñas, de generador de códigos e implementación del envío de e-mail de registro a través de módulos de node.js
- Comprobaciónes para la no duplicidad de campos y validaciones de tipo de dato, longitud, formato.
- Formateo de fechas.
- Uso de roles para controlar permisos sobre la BD.
- Testeos con Postman.



- DIRECTORIO "validations" con creación de esquemas para validar los datos de entrada en la BD con ayuda del módulo Hapi-Joi.
	- 

- Rutas de USUARIOS:

- Crear nuevo usuario 
- Validar cuenta de usuario 
- Hacer login 
- Editar datos de usuario
- Modificar contraseña
- Obtener datos de usuario
- Ver el historial de inscripciones a concursos
- Deshabilitar cuenta.//Falta "rehabilitar", tengo esta función en barbecho
- Borrar cuenta definitivamente
	



- Rutas de CONCURSOS:

- Nuevo concurso
- Editar concurso
- Obtener datos de concurso
- Borrar concurso
- Listar todos los concursos
- Listar próximos concursos
- Listar concursos finalizados

	


- Rutas de INSCRIPCIONES:

- Inscribirse.
- Cancelar suscripción
- Ver usuarios inscritos




-Rutas de VALORACIONES:

- Nueva valoracíon
- Ver ranking de concursos
- Ver valoración de concurso

    
- Actualmente pendiente: 
- Quiero implementar un buscador en que se puedan rellenar todos los campos incluyendo rango de fechas tal y como se pide. Está en desarrollo porque no quiero hacer buscadores separados sino uno general que irá en la landing.
- Pendiente el proceso de asignación de ganadores.
- Pendiente de respuesta respecto a una duda de SQL para modificar el proceso de rating, actualmente funcionando pero mejorable en cuanto a integridad de la BD.
- Revisión completa del proyecto


	
	




