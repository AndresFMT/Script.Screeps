//CODIGO MAIN//
var rolconstruir = require('rol.cons');
var rolrecoge = require('rol.recoger');
var rolecontrolar = require('rol.controlar');

module.exports.loop = function () { 

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var recogida = _.filter(Game.creeps, (creep) => creep.memory.role == 'recoger');
    console.log('recogidas: ' + recogida.length);

    if(recogida.length < 2 || recogida.length <10) {
        var newName = Game.spawns['Felipe'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'recoger'});
        console.log('new recogedor: ' + newName);
    }
    //Creacion de variables para nunca dejar de tener creeps
    var controla = _.filter(Game.creeps, (creep) => creep.memory.role == 'controlar');
    console.log('controles: ' + controla.length);

    if(controla.length < 2 || controla.length < 10) {
        var newName = Game.spawns['Felipe'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'controlar'});
        console.log('new controlador: ' + newName);
    }
    var construye = _.filter(Game.creeps, (creep) => creep.memory.role == 'constructor');
    console.log('constr: ' + construye.length);

    if(construye.length < 2 || construye.length < 10) {
        var newName = Game.spawns['Felipe'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'constructor'});
        console.log('new constructor: ' + newName);
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'recoger') {
            rolrecoge.run(creep);
        }
        if(creep.memory.role == 'controlar') {
            rolecontrolar.run(creep);
        }
        if(creep.memory.role == 'constructor') {
            rolecontrolar.run(creep);
        }
    }
}
