const express = require('express')
const uuid = require('uuid/v1')
const router = express.Router()

let books = [{
    id: 1,
    author: 'John Doe',
    title: "JavaScript book"
}]

router.get('/', (req, res) => {
    res.json(books)
})

router.get('/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10)
    const book = books.find(book => book.id === bookId)
    
    if(book){
        return res.json(book)
    }
    
    return res.status(404).json({
        status: `Book with ID:${bookId} Not Found!`
    })
    
})

router.post('/', (req, res) => {
    // console.log(req.body)
    const book = {
        id: uuid(),
        title: req.body.title || "Dafault title",
        author: req.body.author || "Default author",
    }
    books.push(book)
    return res.json(book)
})

router.put('/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10)
    books.forEach((book) => {
        if(book.id === bookId){
            book.title = req.body.title,
            book.author = req.body.author
        }
    })

    const newBook = books.find(book => book.id === bookId)
    return res.json(newBook)
})

router.delete('/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10)
    books = books.filter(book => book.id != bookId)
    const exsistBook = books.find(book => book.id === bookId)

    if(!exsistBook){
        return res.send(`Book with ID:${bookId} was deleted!`).status(200)
    }else{
        return res.send("Something wrong").status(200)
    }
})

module.exports = router
