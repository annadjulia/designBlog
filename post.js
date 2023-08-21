function getId(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id;
}

async function getPostagem(id) {
    const response = await fetch(`https://api-rest-post-diegocandido.herokuapp.com/postagem/${id}`);
    const data = await response.json();
    return data;
}

async function postagem(){
    const postagem = await getPostagem(getId());
    const postagemContainer = document.querySelector('#postagem');
    postagemContainer.innerHTML = `
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-2 text-primary">${postagem.thumbImageAltText}</strong>
            <h3 class="mb-0">${postagem.title}</h3>
            <div class="mb-1 text-muted">${postagem.postDate}</div>
            <p class="card-text mb-auto">${postagem.description}</p>
            </div>
            <div class="col-auto d-none d-lg-block">
                <img src="https://api-rest-post-diegocandido.herokuapp.com${postagem.thumbImage}" alt="${postagem.thumbImageAltText}" class="img-fluid" style="width: 200px; height: 250px;">
            </div>
        </div>
    `;

    const postagemComments = document.querySelector('#postagem-comments');
    postagem.comments.forEach(comment => {
        postagemComments.innerHTML += `
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                <strong class="d-inline-block mb-2 text-primary">${comment.name}</strong>
                <div class="mb-1 text-muted">${comment.commentDate}</div>
                <p class="card-text mb-auto">${comment.comment}</p>
                </div>
            </div>
        `;
    });

    


}

postagem();
