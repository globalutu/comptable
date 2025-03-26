// Chargement initial du tableau de bord
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
    }

    document.getElementById('username').textContent = currentUser.username;

    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const userData = lines.find(line => line.startsWith(currentUser.username));

            if (userData) {
                const [username, balance, history] = userData.split('|');
                document.getElementById('balance').textContent = `${balance}€`;

                const historyList = document.getElementById('transferHistory');
                historyList.innerHTML = '';
                history.split(';').forEach(entry => {
                    const li = document.createElement('li');
                    li.textContent = entry;
                    historyList.appendChild(li);
                });
            }
        });
});

// Gestion des transferts
document.getElementById('transferBtn').addEventListener('click', () => {
    const recipient = document.getElementById('recipient').value;
    const amount = parseFloat(document.getElementById('amount').value);

    const currentBalance = parseFloat(document.getElementById('balance').textContent);
    if (recipient && !isNaN(amount) && amount > 0 && amount <= currentBalance) {
        const newBalance = currentBalance - amount;
        document.getElementById('balance').textContent = `${newBalance}€`;

        const historyList = document.getElementById('transferHistory');
        const li = document.createElement('li');
        li.textContent = `Transféré ${amount}€ à ${recipient}`;
        historyList.appendChild(li);
    } else {
        alert('Montant ou bénéficiaire invalide.');
    }
});
