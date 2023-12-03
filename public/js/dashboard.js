const anchors = document.querySelectorAll('.blogAnchor')
anchors.forEach(anchor => {
    id = anchor.getAttribute('data-id')
    anchor.setAttribute('href', `/myBlog/${id}`)    
})

const commentAnchors = document.querySelectorAll('.commentAnchor')
commentAnchors.forEach(anchor => {
    id = anchor.getAttribute('data-id')
    anchor.setAttribute('href', `myComment/${id}`)
})