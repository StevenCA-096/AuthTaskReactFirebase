El proyecto quedo formado de la siguiente manera, un api basico de express, que utiliza un sdk de firebase admin, por lo que tiene acceso total 
como si se estuviera en la consola de firebase por lo que logre averiguar, desde el api se hace un get, delete y un put de los usuarios, el put solamente cambiara el correo en este caso, 
aunque vi que era posible almacenar numeros de telefono y otra informacion en el usuario de firebase, por efectos de tiempo y que no conozco mucho de firebase sinceramente, fue que 
solamente hice el put con el email
Antes de iniciar el proyecto se deben instalar las dependencias de ambos, para el api, solamente se haria: 
cd .\firebase-backend\
npm install

Para iniciar el proyecto del api y que funcione todo de el front seria a traves del comando en consola: node .\firebase-backend\api\express\express-api.js

Con el api habilitado sera posible levantar el front desde otra terminar, como siempre con npm install desde el sitio principal del proyecto, por lo que en terminal
habra que revisar que no se este en el directorio del firebase-backend, de estarlo simplemente se retrocede con cd .. y ahora si se ejecuta npm install y npm run dev