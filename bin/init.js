#!/usr/bin/env node

var path        = require('path'),
    pkg         = require(path.join(__dirname, '../package.json')),
    fs          = require('fs'),
    inquirer    = require('inquirer'),
    program     = require('commander'),
    crypto      = require('crypto');

var multiArray  = '',
    algorithm   = 'aes-256-ctr',
    pswrd       = '';

program
  .version( pkg.version )
  .option( '-c, --clean', 'Limpia archivo de coordenadas para crear uno nuevo' )
  .option( '-v, --version', 'Muestra la versión instalada de SuperClave CLI' );

program.on('--help', function(){
  console.log('  Instrucciones de uso:');
  console.log('    En la siguiente URL encontrarás documentos que pueden resolver tus dudas:');
  console.log('    https://github.com/juanbrujo/superclave-CLI/wiki/');
});

program.parse( process.argv );

// ================================================

function encrypt(text, pswrd){
  var cipher    = crypto.createCipher(algorithm,pswrd),
      crypted   = cipher.update(text,'utf8','hex');

  crypted       += cipher.final('hex');

  return crypted;
}

function decrypt(text, pswrd){
  var decipher = crypto.createDecipher(algorithm,pswrd);

  try {
    var dec = decipher.update(text,'hex','utf8');

    dec += decipher.final('utf8');
    return dec;
  } catch (ex) {
    console.log('Error en el password ingresado.');
    var err = new Error('El password no coincide. Intente nuevamente.')
    throw err;
  }
}

function getCoords(row,col){
  return multiArray[col][row];
}

function checkRegexCoord(string){
  return /^[a-jA-J][1-5]$/.test(string);
}

function restNumber(number){
  return parseInt( number - 1 );
}

function getNumFromChar(letter){
  var charactMap = ['a','b','c','d','e','f','g','h','i','j'];
  return charactMap.indexOf(letter);
}

var intro = '\r\n[ SuperClave CLI v.' + pkg.version + ' ]\r\n',
    instruccionesCoords = "La coordenada se compone de 2 caracteres (ej. A1):\n - La primera una letra entre la A a la J\n - La segunda un número entre 1-5",
    requerimientoCoords = function(orden, coord){
     return "Ingrese la " + orden + " coordenada (ej. " + coord + ")";
    };


// ================================================
// COORDS QUESTIONS
// ================================================

var coordsQuestions = [
  {
    type: 'input',
    name: 'coord1',
    message: 'Primera coordenada:',
    validate: function( value ) {
      if ( value ) {
        var valueChecked = checkRegexCoord( value );
        if( valueChecked ) {
          return true;
        } else {
          return instruccionesCoords;
        }
      } else {
        return requerimientoCoords('primera','A1');
      }
    },
    filter: function( val ) { 
      return val.toLowerCase(); 
    }
  }
  ,
  {
    type: 'input',
    name: 'coord2',
    message: 'Segunda coordenada:',
    validate: function( value ) {
      if ( value ) {
        var valueChecked = checkRegexCoord( value );
        if( valueChecked ) {
          return true;
        } else {
          return instruccionesCoords;
        }
      } else {
        return requerimientoCoords('segunda','C4');
      }
    },
    filter: function( val ) { 
      return val.toLowerCase(); 
    }
  }
  ,
  {
    type: 'input',
    name: 'coord3',
    message: 'Tercera coordenada:',
    validate: function( value ) {
      if ( value ) {
        var valueChecked = checkRegexCoord( value );
        if( valueChecked ) {
          return true;
        } else {
          return instruccionesCoords;
        }
      } else {
        return requerimientoCoords('tercera','E3');
      }
    },
    filter: function( val ) { 
      return val.toLowerCase(); 
    }
  }
  ,
  {
    type: 'confirm',
    name: 'askAgain',
    message: '¿Deseaas volver a ingresar coordenadas?',
    default: true
  }
];

// ================================================
// PROMPT INITIAL QUESTIONS
// ================================================

function askCoords() {

  // ask
  inquirer.prompt( coordsQuestions, function( answers ) {

    var coord1 = answers.coord1,
        coord2 = answers.coord2,
        coord3 = answers.coord3,
        pswrd  = answers.pswrd,
        result1 = '',
        result2 = '',
        result3 = '';

    var Xcord = function(coord){
                  return getNumFromChar( coord.split('')[0] ); 
                },
        Ycord = function(coord){ 
                  return restNumber( coord.split('')[1] ); 
                };

    if( getCoords( Xcord(coord1), Ycord(coord1) ).toString().length === 1) {
      result1 = '0' + getCoords( Xcord(coord1), Ycord(coord1) );
    } else {
      result1 = getCoords( Xcord(coord1), Ycord(coord1) );
    }
    if( getCoords( Xcord(coord2), Ycord(coord2) ).toString().length === 1) {
      result2 = '0' + getCoords( Xcord(coord2), Ycord(coord2) );
    } else {
      result2 = getCoords( Xcord(coord2), Ycord(coord2) );
    }
    if( getCoords( Xcord(coord3), Ycord(coord3) ).toString().length === 1) {
      result3 = '0' + getCoords( Xcord(coord3), Ycord(coord3) );
    } else {
      result3 = getCoords( Xcord(coord3), Ycord(coord3) );
    }

    console.log('\nSegún las coordenadas ingresadas, sus valores son:');

    // return results
    console.log(' ----------------');
    console.log(' | ' + coord1.toUpperCase() + ' | ' + coord2.toUpperCase() + ' | ' + coord3.toUpperCase() + ' | ');
    console.log('  --------------');
    console.log(' | ' + result1 + ' | ' + result2 + ' | ' + result3 + ' | ');
    console.log(' ----------------');

    if (answers.askAgain) { // must be improved, it works by now
      askCoords();
    }

  });

};


// ================================================
// CREATE INITIAL .COORDS FILE
// ================================================

var instruccionesInst = function(orden){
  return 'Ingrese la ' + orden + ' fila de 2 números separados por coma\n(por ejemplo: 54,48,99,24,65,10,78,12,61,38):';
}

var requerimientoInst = 'Deben ser exactas 10 secuencias de 2 números separados por coma\n(por ejemplo: 54,48,99,24,65,10,78,12,61,38)';
var requerimientoPass = 'Debes ingresar una clave, aunque sea mínima';


// ================================================
// ASK FOR COORDS TO SAVE THEM
// ================================================
var installQuestions = [
  {
    type: 'input',
    name: 'row1',
    message: instruccionesInst('primera'),
    validate: function( value ) {
      var valueChecked = checkRegexRowCoords( value );
      if( valueChecked ) {
        return true;
      } else {
        return requerimientoInst;
      }
    }
  }
  ,
  {
    type: 'input',
    name: 'row2',
    message: instruccionesInst('segunda'),
    validate: function( value ) {
      var valueChecked = checkRegexRowCoords( value );
      if( valueChecked ) {
        return true;
      } else {
        return requerimientoInst;
      }
    }
  }
  ,
  {
    type: 'input',
    name: 'row3',
    message: instruccionesInst('tercera'),
    validate: function( value ) {
      var valueChecked = checkRegexRowCoords( value );
      if( valueChecked ) {
        return true;
      } else {
        return requerimientoInst;
      }
    }
  }
  ,
  {
    type: 'input',
    name: 'row4',
    message: instruccionesInst('cuarta'),
    validate: function( value ) {
      var valueChecked = checkRegexRowCoords( value );
      if( valueChecked ) {
        return true;
      } else {
        return requerimientoInst;
      }
    }
  }
  ,
  {
    type: 'input',
    name: 'row5',
    message: instruccionesInst('quinta'),
    validate: function( value ) {
      var valueChecked = checkRegexRowCoords( value );
      if( valueChecked ) {
        return true;
      } else {
        return requerimientoInst;
      }
    }
  }
  ,
  {
    type: 'password',
    name: 'pswrd',
    message: 'Ingrese un password para cifrar las coordenadas en el archivo:',
    validate: function( value ) {
      if( value ) {
        return true;
      } else {
        return requerimientoPass;
      }
    }
  }
  ,
  {
    type: 'confirm',
    name: 'confirmInstall',
    message: 'Listo para escribir archivo con coordenadas. ¿Confirmar?'
  }
];

function createCoords(){
  // say hello
  console.log(intro);
  console.log('En este instante se creará el archivo oculto con las coordenadas de tu tarjeta SuperClave');

  // ask
  inquirer.prompt( installQuestions, function( answers ) {

    var row1  = answers.row1,
        row2  = answers.row2,
        row3  = answers.row3,
        row4  = answers.row4,
        row5  = answers.row5;

    pswrd     = answers.pswrd;

    if ( answers.confirmInstall ) {
      createCoordsFile(row1, row2, row3, row4, row5);
    } else {
      return false;
    }

  });

}

function checkRegexRowCoords(string){
  return /^[0-9]\d(?:,[0-9]\d){9}$/.test(string);
}

function createCoordsFile(row1, row2, row3, row4, row5){

  var row = '';

  row += '[' + row1 + '],\n';
  row += '[' + row2 + '],\n';
  row += '[' + row3 + '],\n';
  row += '[' + row4 + '],\n';
  row += '[' + row5 + ']\n';

  row = encrypt(row, pswrd);

  fs.writeFile('./.coords', row, function(err) {
    if(err) {
      return console.log(err);
    } else {
      console.log("Archivo .coords creado con éxito.");
    }
  });

}

function cleanCoords(){
  fs.writeFile('./.coords', '', function(err) {
    if(err) {
      return console.log(err);
    } else {
      console.log("Archivo .coords borrado con éxito.");
    }
  });
}

var confirmCleanQuestion = [
  {
    type: 'confirm',
    name: 'confirmClean',
    message: 'Se borrarán las coordenadas ya guardadas. ¿Confirmas?'
  }
];

var askPassword = function(coordsFile){
  inquirer.prompt({
    type: 'password',
    name: 'pswrd',
    message: 'Ingresa el password que usaste para cifrar tus coordenadas:',
    validate: function( value ) {

      if (value) {
        pswrd   = value;
        coords  = decrypt(coordsFile, pswrd);

        try {
          eval("multiArray = " + '[' + coords + ']');
          return true;
        } catch (ex) {
          console.log(' No, es otra. ')
          return false;
        }

      } else {
        return "Ingresa el password con el que guardaste tus coordenadas";
      }
    }
  }, function( answer ) {
    askCoords();
  });
}

// check if .coords exists and save them to coords variable
// else create empty file
function init(){

  // say hello
  console.log(intro);

  if (program.clean) {

    inquirer.prompt( confirmCleanQuestion, function( answers ) {
      if ( answers.confirmClean ) {
        cleanCoords();
      } else {
        return false;
      }
    });

  } else {

    fs.stat('./.coords', function(err, stat) {
      if( err == null ) {

      var coords = fs.readFileSync('./.coords', 'utf8');

      if(coords) {
          // ask for password
          askPassword(coords);
        } else {
          // no coords, create new ones
          createCoords();
        }
      } else if( err.code == 'ENOENT' ) {
        fs.writeFile('./.coords', '');
        createCoords();
      } else {
        console.log('Error: ', err.code);
      }
    });

  }

}

// start
init();
