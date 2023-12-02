
const newPost = async (event) => {
    event.preventDefault()

    const title = document.querySelector('#postTitle').value.trim()
    const text = document.querySelector('#postText').value.trim()

    if (title && text) {
        const response = await fetch('/newPost', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json'}
        })
    
        if (response.ok) {
            console.log('New Comment successful')
            location.reload()
        } else {
            alert(response)
        }
    }
}

document.querySelector('#newPost' ).addEventListener('submit', newPost) 

