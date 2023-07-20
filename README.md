# **Simple Book Catalog Application using express, typescript, mongoose (Backend)**

## **Live Link: https://book-catalog-tau.vercel.app/**

---

## Welcome route

- [Website Link](https://book-catalog-tau.vercel.app/)

---

## Auth routes / Common routes

### Registration or signup for user (post route)

- /api/v1/auth/signup [Link](https://book-catalog-tau.vercel.app/api/v1/auth/signup)

- Need **name (firstName, lastName), email, password** from **req.body**

### Signin (post route)

- /api/v1/auth/signin [Link](https://book-catalog-tau.vercel.app/api/v1/auth/signin)

- Need **email, password** from **req.body**

---

## User routes

### Get own profile information (get route)

- /api/v1/user [Link](https://book-catalog-tau.vercel.app/api/v1/user)

- Need **jwt** from **req.headers.authorization**

### Add book into own wishlist (post route)

- /api/v1/user/add-book-into-wishlist/:id [Link](https://book-catalog-tau.vercel.app/api/v1/user/add-book-into-wishlist/:id)

- Need **id** from **req.params**

- Need **jwt** from **req.headers.authorization**

### Add book into own booklist (post route)

- /api/v1/user/add-book-into-booklist/:id [Link](https://book-catalog-tau.vercel.app/api/v1/user/add-book-into-booklist/:id)

- Need **id** from **req.params**

- Need **status** (Currently reading/ Read soon/ Finished reading) from **req.body**

- Need **jwt** from **req.headers.authorization**

### Update own booklist (patch route)

- /api/v1/user/update-booklist/:id [Link](https://book-catalog-tau.vercel.app/api/v1/user/update-booklist/:id)

- Need **id** from **req.params**

- Need **status** (Currently reading/ Read soon/ Finished reading) from **req.body**

- Need **jwt** from **req.headers.authorization**

---

## Book routes

### Add book (post route)

- /api/v1/book/add-book [Link](https://book-catalog-tau.vercel.app/api/v1/book/add-book)

- Need book's **title, author, genre, publicationDate** from **req.body**

- Need **jwt** from **req.headers.authorization**

### Update own book (patch route)

- /api/v1/book/update-book/:id [Link](https://book-catalog-tau.vercel.app/api/v1/book/update-book/:id)

- Need book's **title, author, genre, publicationDate** from **req.body**

- Need **id** from **req.params**

- Need **jwt** from **req.headers.authorization**

### Delete own book (delete route)

- /api/v1/book/delete-book/:id [Link](https://book-catalog-tau.vercel.app/api/v1/book/delete-book/:id)

- Need **id** from **req.params**

- Need **jwt** from **req.headers.authorization**

### Review on a book (post route)

- /api/v1/book/review/:id [Link](https://book-catalog-tau.vercel.app/api/v1/book/review/:id)

- Need **id** from **req.params**

- Need **review** from **req.body**

- Need **jwt** from **req.headers.authorization**

### Get single book (get route)

- /api/v1/book/get-single-book/:id [Link](https://book-catalog-tau.vercel.app/api/v1/book/get-single-book/:id)

- Need **id** from **req.params**

### Get all books (get route)

- /api/v1/book/get-all-books [Link](https://book-catalog-tau.vercel.app/api/v1/book/get-all-books)

### Pagination and Filtering routes of Books (get route)

- /api/v1/book/get-all-books?page=1&limit=10 (Page {default: 1} and limit {default: 10})

- /api/v1/book/get-all-books?sortBy=title&sortOrder=asc (sortBy and sortOrder {default: asc})

- /api/v1/book/get-all-books?sortBy=author&sortOrder=desc (sortBy and sortOrder)

- /api/v1/book/get-all-books?title=Ma (accurate search)

- /api/v1/book/get-all-books?searchTerm=himu (any matching search)

### Get own books (get route)

- /api/v1/book/get-own-book [Link](https://book-catalog-tau.vercel.app/api/v1/book/get-own-book)

- Need **jwt** from **req.headers.authorization**

- pagination and filter can be used like get-all-books route

---

## Login Info

- email : abc@gmail.com

- password : 12345

---

---

---
