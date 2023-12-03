const update = async (event) => {
    event. preventDefault()

    const title = document.querySelector('#editTitle').innerHTML.trim()
    const text = document.querySelector('#editText').innerHTML.trim()

    console.log(title)
    console.log(text)    

    if (title && text) {
        const response = await fetch(`${document.location.pathname}/updateComment`, {
            method: 'PUT',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json'}
        })

        if (response.ok) {
            console.log('Successfully updated post')
            document.location.replace('/dashboard')
        } else {
            alert('Update Failure')
        }
    }
    else{
        alert('Update Failure: Title nor Text may be blank!')
    }
}

const deleteData = async (event) => {
    event.preventDefault()

    const response = await fetch(`${document.location.pathname}/deleteComment`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
    })

    if (response.ok) {
        console.log('Successfully deleted post')
        document.location.replace('/dashboard')
    } else {
        alert('Delete Failure')
    }
}


document.querySelector('#update-blog-form' ).addEventListener('submit', update) 
document.querySelector('#delete-comment' ).addEventListener('click', deleteData) 

