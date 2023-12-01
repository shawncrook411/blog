

const login = async (event) => {
    event.preventDefault()

    const username = document.querySelector('#username').value.trim()
    const password = document.querySelector('#password').value.trim()

    if (username && password.length >= 8) {
        const response = await fetch('', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'},
        })

        if (response.ok) {
            alert('Successfully logged in')
            document.location.replace('/')
        } else {
            alert('Login Failure')
        }
    }
}

const signUp = async (event) => {
    event.preventDefault()

    const username = document.querySelector('#username').value.trim()
    const password = document.querySelector('#password').value.trim()
    const confirm = document.querySelector('#confirm').value.trim()

    if (username && password && password === confirm) {
        const response = await fetch('', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'}
        })
    
        if (response.ok) {
            alert('Signup successful')
            document.location.replace('/')
        } else {
            alert('Signup Failure')
        }
    }
}

document.querySelector('#login-form').addEventListener('submit', login)
document.querySelector('#signup-form').addEventListener('submit', signUp)
