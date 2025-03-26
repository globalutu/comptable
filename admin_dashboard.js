document.getElementById('addFundsForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const amount = parseFloat(document.getElementById('amount').value);

    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const userIndex = lines.findIndex(line => line.startsWith(user));

            if (userIndex !== -1) {
                const [username, balance, history] = lines[userIndex].split('|');
                const newBalance = parseFloat(balance) + amount;
                lines[userIndex] = `${username}|${newBalance}|${history};Ajouté ${amount}€`;
                saveData(lines);
                alert('Fonds ajoutés avec succès !');
            } else {
                alert('Utilisateur introuvable.');
            }
        });
});

function saveData(lines) {
    console.log('Nouvelles données sauvegardées :', lines.join('\n'));
    // Implémentez l'écriture dans le fichier texte ici si possible côté serveur.
}
