window.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (!user) {
        window.location.href = 'index.html';
    }

    document.getElementById('username').textContent = user.username;
    document.getElementById('role').textContent = user.role;
    document.getElementById('manager').textContent = user.manager;
    document.getElementById('phone').textContent = user.phone;

    if (user.role === 'Admin') {
        document.getElementById('adminActions').style.display = 'block';
    }

    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const userData = lines.find(line => line.startsWith(user.username));
            const [username, balance, history] = userData.split('|');

            document.getElementById('balance').textContent = `${balance}€`;
            const historyList = document.getElementById('transferHistory');
            history.split(';').forEach(entry => {
                const li = document.createElement('li');
                li.textContent = entry;
                li.className = 'list-group-item';
                historyList.appendChild(li);
            });
        });
});

document.getElementById('transferForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const recipient = document.getElementById('recipient').value;
    const amount = parseFloat(document.getElementById('amount').value);
    alert(`Transfert en attente : Veuillez vérifier après 2 minutes.`);
});
