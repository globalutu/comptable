const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

// Charger les utilisateurs
app.get("/users", (req, res) => {
    fs.readFile("users.txt", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Erreur lors de la lecture des utilisateurs.");
        }
        const users = data.split("\n").map(line => JSON.parse(line));
        res.send(users);
    });
});

// Ajouter des fonds
app.post("/add-funds", (req, res) => {
    const { username, amount } = req.body;
    fs.readFile("users.txt", "utf-8", (err, data) => {
        if (err) return res.status(500).send("Erreur lors de la lecture des données.");
        let users = data.split("\n").map(line => JSON.parse(line));
        const user = users.find(u => u.username === username);
        if (user) {
            user.balance += amount;
            fs.writeFile("users.txt", users.map(u => JSON.stringify(u)).join("\n"), err => {
                if (err) return res.status(500).send("Erreur lors de l'ajout des fonds.");
                res.send("Fonds ajoutés avec succès.");
            });
        } else {
            res.status(404).send("Utilisateur non trouvé.");
        }
    });
});

// Lancer le serveur
app.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));
