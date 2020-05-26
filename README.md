

 

- Planificación de rutas a partir de wireframes, requerimientos y mi diseño de BD en MySQL. 

- Creación del entorno de desarrollo.

- Instalación de dependencias, edición del .gitignore, creación .env, .eslintrc.json

- Edición de package.json para script de arranque del módulo "start" y "dev".

- Conexión con mi Base de Datos en DB.js + edición del .env 

- Creación de directorios (middlewares, validations, helpers)



-TRABAJO CON LAS RUTAS DE "USUARIOS", "CONCURSOS", "INSCRIPCIONES" y "VALORACIONES", correspondientes a las tablas de la BD, exceptuando las "VALORACIONES" que se incluyen en la tabla de INSCRIPCIONES.


 - Importación y exportación de funciones y módulos, uso de módulos externos.
 - Utilización de arrays, objetos, destructuring, asincronía.
 - Manejo del paso de parámetros, autenticaciones e información envíada a través del "body".
 - Inyección de SQL, consultas multitabla.
 - Uso de encryptación de contraseñas, de generador de códigos e implementación del envío de e-mail de registro a través de      módulos de node.js
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
	- Listar concursos finalizado
	- Asignar ganador

	


- Rutas de INSCRIPCIONES:

	- Inscribirse.
	- Cancelar suscripción
	- Ver usuarios inscritos




-Rutas de VALORACIONES:

   - Nueva valoracíon
   - Ver ranking de concursos
   - Ver valoración de concurso



    
 - ACTUALMENTE PENDIENTE: Quiero implementar un buscador en que se puedan rellenar todos los campos incluyendo rango de fechas tal y como se pide. Está en desarrollo porque no quiero hacer buscadores separados sino uno general que busque entre todos los campos de la tabla y que irá en la landing.

- Pendiente subida de imágenes para "nuevo concurso" y "edición de concurso".
			  
- Pendiente de respuesta respecto a una duda de SQL para modificar el proceso de rating, actualmente funcionando pero mejorable en cuanto a integridad de la BD. Ya que sólo se me pide una valoración por persona inscrita y ésta sólo se hará en relación a las inscripciones, he añadido un campo "valoración" en la tabla de inscripciones para evitar duplicidades, pues la tabla de VALORACIONES tenía prácticamente los mismos campos que la de INSCRIPCIONES cuando se me dió el VB de la parte SQL, es decir, las claves foráneas id_usuario e id_concurso de la tabla usuarios y concursos respectivamente. Por evitar duplicidades he hecho la valoración en relación a la inscripción y funciona perfectamente pero tengo dudas respecto a la integridad de este método que me gustaría poder comentar con alguien.

- Revisión completa del proyecto


	
	




