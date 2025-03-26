// Variables globales
let balance = 1000;
const transferHistory = [];

// Simuler une connexion et charger les données
window.addEventListener('DOMContentLoaded', () => {
    // Exemple de chargement initial
    updateBalance();
    displayMessage("Bienvenue sur votre tableau de bord !");
});

// Mettre à jour le solde
function updateBalance() {
    document.getElementById('balance').textContent = `${balance}€`;
}

// Afficher un message
function displayMessage(msg) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = msg;
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 3000);
}

// Effectuer un transfert
document.getElementById('transferBtn').addEventListener('click', () => {
    const recipient = document.getElementById('recipient').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (recipient && !isNaN(amount) && amount > 0 && amount <= balance) {
        balance -= amount;
        transferHistory.push(`Envoyé ${amount}€ à ${recipient}`);
        updateBalance();
        updateHistory();
        displayMessage("Transfert réussi !");
    } else {
        displayMessage("Erreur : Montant ou bénéficiaire invalide !");
    }
});

// Historique des transferts
function updateHistory() {
    const historyList = document.getElementById('transferHistory');
    historyList.innerHTML = '';
    transferHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// Validation des transferts
document.getElementById('validateBtn').addEventListener('click', () => {
    if (transferHistory.length > 0) {
        displayMessage("Tous les transferts ont été validés !");
        transferHistory.length = 0;
        updateHistory();
    } else {
        displayMessage("Aucun transfert à valider.");
    }
});
