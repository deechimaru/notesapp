const fs = require('fs')
const chalk = require('chalk')
const http = require('http')

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.underline.green('Your notes:'))
    let noteIndex = 1
    notes.forEach((note) => {
        console.log(chalk.bold(noteIndex) + '. ' + note.title)
        noteIndex += 1
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteBuffer = notes.find((note) => note.title === title)
    if(noteBuffer) {
        console.log(chalk.underline(noteBuffer.title) + '\n' + noteBuffer.body)
    } else {
        console.log(chalk.bgRed('Cannot find this note!'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.bgGreen('Note added!'))
    } else{
        console.log(chalk.bgRed('Cannot add! - Title already exists!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length) {
        console.log(chalk.bgGreen('Note Removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRed('No note found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    listNotes: listNotes,
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote
}