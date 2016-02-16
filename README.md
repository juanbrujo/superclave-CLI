# SuperClave-CLI

*CLI en Node.js para manejar de manera local y a través de terminal.app la SuperClave (soft token) del banco Santander Chile*

--

**SuperClave CLI** consiste en un programa escrito en *NodeJS* que se instala globalmente en el computador del usuario que quiera utilizarlo y que guarda las coordenadas de la tarjeta *SuperClave* de manera oculta y cifrada en el directorio `/usr/lib/node_modules`. El archivo generado es un *dotfile* (oculto) que no está visiblemente accesible. Una vez guardadas las coordenadas basta con llamar desde *terminal.app* y éste solicitará las 3 coordenadas que toda transacción electrónica del banco solicita, para luego presentar los valores correspondientes.

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

```
$ git clone https://github.com/juanbrujo/superclave-CLI
$ cd superclave-CLI
$ npm install
$ node bin/init.js
```

## TO-DO:

- [ ] npm global installation
- [ ] verificar que coordenadas no sean repetidas
- [ ] verificar que coordenadas sean incrementales en filas
- [x] cifrado de las coordenadas guardadas
- [ ] aceptación de términos y condiciones
- [ ] documentar las funciones
- [ ] testing 😰

## Disclaimer:

Este software fue hecho exclusivamente para solucionar la pérdida de tiempo que sufro cada vez que me toca hacer transferencias electrónicas. Se publica en este repositorio para estudio del código fuente y transparencia de su funcionalidad interna.

Ninguna información ingresada a través de este desarrollo es enviada ó procesada por terceros; las coordenadas se guardan cifradas en el computador del usuario que quiere utilizar este software y permite con un simple comando remover las coordenadas ya guardadas.

Este repositorio, el desarrollo que contiene y su autor no tienen relación oficial alguna con Banco Santander Chile ni alguna de sus sus empresas, filiales, socios ó representantes legales.

## Licencia:

[MIT License](https://github.com/juanbrujo/superclave-CLI/blob/master/LICENSE)
