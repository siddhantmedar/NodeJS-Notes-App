const fs = require('fs')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.1.0')

yargs.command({
    command:'add',
    describe:'Add a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body) 
    }
})

yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command:'list',
    describe:'List a note',
    handler(){
        notes.listNote() 
    }
})

yargs.command({
    command:'read',
    describe:'Read a note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true
        }
    },
    handler(argv){
        notes.readNote(argv.title),
        type='string'
    }
})

yargs.parse()