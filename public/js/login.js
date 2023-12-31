

const login = async (event) => {
    event.preventDefault()

    const username = document.querySelector('#username').value.trim()
    const password = document.querySelector('#password').value.trim()

    if (username && password) {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'},
        })

        if (response.ok) {
            console.log('Successfully logged in')
            document.location.replace('/dashboard')
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

    if (username && password.length >=8 && password === confirm) {
        const response = await fetch('createAccount', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'}
        })
    
        if (response.ok) {
            console.log('Signup successful')
            document.location.replace('/login')
        } else {
            alert(response)
        }
    }
}

if(document.location.pathname === '/login' ) 
    { document.querySelector('#login-form' ).addEventListener('submit', login ) }

if(document.location.pathname === '/signup') 
    { document.querySelector('#signup-form').addEventListener('submit', signUp) }
