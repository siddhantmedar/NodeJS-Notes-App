const fs = require('fs')
const chalk = require('chalk')

const getNote = () =>{
    return "Your notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicates = notes.filter((notes) => notes.title === title)
    const duplicates = notes.find((notes) => notes.title === title)

    if(!duplicates){ //or undefined
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note added successfully!'))
    }
    else{
        console.log(chalk.yellow.inverse("Note title already taken!"))
    }
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('data.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('data.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
    
}

const removeNote = function(title){
    const notes = loadNotes()
    const notesToKeep = notes.filter((notes) => notes.title !== title)
    saveNotes(notesToKeep)
    if(notes.length === notesToKeep.length){
        console.log(chalk.red.inverse('Note not found!')) //or use red.inverse for bg
    }
    else console.log(chalk.green.inverse('Note removed successfully!')) //same either use this or use green.inverse
}

const listNote = function() {
    const notes = loadNotes()
    console.log(chalk.green.inverse('Your notes!'))
    notes.forEach((notes)=>{
        console.log('Title: ' +notes.title+ ' ' +'Body: '+notes.body)
})
}

const readNote = (title) => {
    const notes = loadNotes()
    const findNote = notes.find((notes)=> notes.title === title)
    if(findNote) {
        console.log(chalk.green.inverse('Title: '+findNote.title))
        console.log(chalk.green.inverse('Body: ' +findNote.body))
    }
    else console.log(chalk.red.inverse('Note not found!'))
}

module.exports = {
    getNote: getNote,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}