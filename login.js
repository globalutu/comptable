document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('users.txt')
        .then(response => response.text())
        .then(data => {
            const users = data.split('\n').map(line => line.split(','));
            const user = users.find(u => u[0] === username && u[1] === password);

            if (user) {
                const role = user[2];
                localStorage.setItem('currentUser', JSON.stringify({ username, role }));
                window.location.href = role === 'Admin' ? 'admin_dashboard.html' : 'user_dashboard.html';
            } else {
                document.getElementById('loginMessage').textContent = 'Identifiants incorrects';
            }
        });
});
