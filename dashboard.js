window.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'index.html';
    }

    document.getElementById('username').textContent = user.name;
    document.getElementById('balance').textContent = `${user.balance}€`;

    const historyList = document.getElementById('historyList');
    user.history.split(';').forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        li.className = 'list-group-item';
        historyList.appendChild(li);
    });
});

// Ajouter des fonds
document.getElementById('addFunds').addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const amount = 200; // Exemple de montant
    user.balance = parseFloat(user.balance) + amount;
    user.history += `;Ajouté ${amount}€`;

    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Fonds ajoutés avec succès!');
    location.reload();
});

// Effectuer un transfert
document.getElementById('transferBtn').addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const recipient = 'Marie'; // Exemple de bénéficiaire
    const amount = 50; // Exemple de montant
    user.balance = parseFloat(user.balance) - amount;
    user.history += `;Transféré ${amount}€ à ${recipient}`;

    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Transfert effectué avec succès!');
    location.reload();
});

// Écrire au support
document.getElementById('supportBtn').addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const message = 'Problème avec le solde'; // Exemple de message
    user.history += `;Message: ${message}`;

    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Message envoyé au support!');
    location.reload();
});
