document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Vérification avec fichier texte
    fetch('users.txt')
        .then(response => response.text())
        .then(data => {
            const users = data.split('\n').map(line => line.split(','));
            const user = users.find(u => u[0] === username && u[1] === password);

            if (user) {
                const [username, , role, phone, manager] = user;
                localStorage.setItem('currentUser', JSON.stringify({ username, role, phone, manager }));
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('loginMessage').textContent = 'Identifiants incorrects';
            }
        });
});
