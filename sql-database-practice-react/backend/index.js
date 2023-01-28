import  express from "express"
import mysql from "mysql"
import cors from "cors"


const db = mysql.createConnection({
    host:"localhost",
    user:"username",
    password:"password",
    database:"test"
})



const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req, res) => {
    res.json("Hello this is backend")
} )

app.get("/books", (req, res) => {
    const q = "select * from book";
    db.query(q, (err, data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) =>{
    const q = "INSERT INTO book (`title`, `desc`, `price`, `cover`) VALUES(?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];
    db.query(q, [values], (err, data)=> {
        if(err) return res.json(err);
        return res.json("Book has been added successfully");
    });
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM book WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE book SET `title`= ? , `desc` = ? ,`price` = ? ,`cover` = ? WHERE `id` = ? ";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been updated successfully");

    });
});

app.listen(5000, () => {
    console.log("Connected to backend!")
})

