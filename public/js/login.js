const handleLogin = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    console.log(username, password);

    if (username && password) {
        const response = await fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/users/dashboard');
        } else {
            alert(`Can't log in.`);
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', handleLogin);