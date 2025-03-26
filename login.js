document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simuler la lecture d'un fichier texte pour les utilisateurs
    fetch('users.txt')
        .then(response => response.text())
        .then(data => {
            const users = data.split('\n').map(line => line.split(','));
            const userFound = users.find(user => user[0] === username && user[1] === password);

            if (userFound) {
                localStorage.setItem('currentUser', JSON.stringify({ username }));
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('loginMessage').textContent = 'Nom d\'utilisateur ou mot de passe incorrect.';
            }
        });
});
