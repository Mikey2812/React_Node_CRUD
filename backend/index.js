import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Huy2812@",
    database: "react_crud",
  });

app.get("/", (req, res) => {
    res.json("hello");
}); 

//Get
app.get("/books", (req, res) => {
    const query = "SELECT * FROM books";
    db.query(query, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
});


app.get("/book/:id", (req, res) => {
    const bookId = req.params.id;
    const query = "SELECT * FROM books WHERE id = ?";
    db.query(query, [bookId], (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
});

//Add
app.post("/books", (req, res) => {
    const q = "INSERT INTO books(`title`, `description`, `price`, `image`) VALUES (?)";
    
    const values = [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.image,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
});

//Edit  
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `image`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.image,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
});

//Delete
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
});

app.listen(8800, () => {
    console.log('Connected to backend!');
    console.log('http://localhost:8800/');
})