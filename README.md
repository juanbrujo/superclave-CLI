# SuperClave-CLI

*CLI en Node.js para manejar de manera local y a través de terminal.app la SuperClave (soft token) del banco Santander Chile*

--

**SuperClave CLI** consiste en un programa escrito en *NodeJS* que se instala globalmente en el computador del usuario que quiera utilizarlo y que guarda las coordenadas de la tarjeta *SuperClave* de manera oculta en el directorio `/usr/lib/node_modules`. El archivo generado es un *dotfile* (oculto) que no está visiblemente accesible. Una vez guardadas las coordenadas basta con llamar desde *terminal.app* y éste solicitará las 3 coordenadas que toda transacción electrónica del banco solicita, para luego presentar los valores correspondientes.

![](https://dl.dropboxusercontent.com/u/3522/superclave-CLI.png)

## Uso:

```
$ superclave (instala y consulta coordenadas).
$ superclave -c (vacía un archivo de coordenadas ya creado).
```

## Instalación:

### global (recomendado)

TO-DO

### local

Descarga los archivos y:

```
$ git clone https://github.com/juanbrujo/superclave-CLI
$ cd superclave-CLI
$ npm install
$ node bin/init.js
```

## TO-DO:

- global npm installation
- verificar que coordenadas no sean repetidas
- verificar que coordenadas sean incrementales en filas
- cifrado de las coordenadas guardadas
- aceptación de términos y condiciones

## Disclaimer:

Ninguna información ingresada a través de este desarrollo es enviada ó procesada por terceros; las coordenadas se guardan de manera local en el computador del usuario que quiere utilizar este software y una vez.

Este repositorio y el desarrollo que contiene no tiene relación oficial alguna con Banco Santander Chile ni alguna de sus sus empresas, filiales, socios ó representantes legales. 



