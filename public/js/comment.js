
const newComment = async (event) => {
    event.preventDefault()

    const title = document.querySelector('#commentTitle').value.trim()
    const text = document.querySelector('#commentText').value.trim()

    if (title && text) {
        const response = await fetch(`${document.location.pathname}/createComment`, {
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

document.querySelector('#newComment' ).addEventListener('submit', newComment) 

