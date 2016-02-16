#!/usr/bin/env node

var path 			= require('path');
var pkg 			= require(path.join(__dirname, '../package.json'));
var fs 				= require('fs');
var inquirer 	= require('inquirer');
var program   = require('commander');

var multiArray = '';

program
  .version( pkg.version )
  .usage( '[options] <file ...>' )
  .option( '-c, --clean', 'Limpia archivo de coordenadas para crear uno nuevo.')
  .parse(process.argv);

// ================================================

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
//  return letter.charCodeAt(0)-97;
  var charactMap = ['a','b','c','d','e','f','g','h','i','j'];
  return charactMap.indexOf(letter);
}

var intro = '\r\n[ SuperClave CLI v.' + pkg.version + ' ]\r\n';

var instruccionesCoords = "La coordenada son 2 caracteres (ej. A1):\n - La primera una letra entre la A a la J\n - La segunda un número entre 1 y 5 (incluídos)";

var requerimientoCoords = function(orden, coord){
	return "Ingrese la " + orden + " coordenada (ej. " + coord + ")";
}


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
  },
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
  },
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
];

// ================================================
// PROMPT INITIAL QUESTIONS
// ================================================

function askCoords() {
  // say hello
  console.log(intro);

  // ask
  inquirer.prompt( coordsQuestions, function( answers ) {

	  var coord1 = answers.coord1,
	      coord2 = answers.coord2,
	      coord3 = answers.coord3;

	  var Xcord = function(coord){ 
	  	return getNumFromChar( coord.split('')[0] ); 
	  };
		var Ycord = function(coord){ 
			return restNumber( coord.split('')[1] ); 
		};

	  console.log('\nLas coordenadas ingresadas y sus valores son:');

	  // return results
	  console.log(' ----------------');
	  console.log(' | ' + answers.coord1.toUpperCase() + ' | ' + answers.coord2.toUpperCase() + ' | ' + answers.coord3.toUpperCase() + ' | ');
	  console.log('  --------------');
	  console.log(' | ' + getCoords( Xcord(coord1), Ycord(coord1) ) + ' | ' + getCoords( Xcord(coord2), Ycord(coord2) ) + ' | ' + getCoords( Xcord(coord3), Ycord(coord3) ) + ' | ');
	  console.log(' ----------------');

	});

};


// ================================================
// CREATE INITIAL .COORDS FILE
// ================================================

var instruccionesInst = function(orden){
	return 'Ingrese la ' + orden + ' fila de 2 números separados por coma\n(por ejemplo: 54,48,99,24,65,10,78,12,61,38):';
}

var requerimientoInst = 'Deben ser exactas 10 secuencias de 2 números separados por coma\n(por ejemplo: 54,48,99,24,65,10,78,12,61,38)';

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

  	var row1 = answers.row1;
  	var row2 = answers.row2;
  	var row3 = answers.row3;
  	var row4 = answers.row4;
  	var row5 = answers.row5;

  	if ( answers.confirmInstall ) {
      createCoordsFile(row1, row2, row3, row4, row5);
    } else {
    	return false;
    }

  });

}

function checkRegexRowCoords(string){
	return /^[1-9]\d(?:,[1-9]\d){9}$/.test(string);
}

function createCoordsFile(row1, row2, row3, row4, row5){

	var row = '';
	row += '[' + row1 + '],\n';
	row += '[' + row2 + '],\n';
	row += '[' + row3 + '],\n';
	row += '[' + row4 + '],\n';
	row += '[' + row5 + ']\n';

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

// check if .coords exists and save them to coords variable
// else create empty file
function init(){

	if (program.clean) {

		cleanCoords();

	} else {

		fs.stat('./.coords', function(err, stat) {
		  if( err == null ) {

		    var coords = fs.readFileSync('./.coords', 'utf8');

		    if(coords) {

		    	multiArray = JSON.parse('[' + coords + ']');
					askCoords();
		    
		    } else {

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
