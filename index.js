async function getPostagens() {
    const response = await fetch('https://api-rest-post-diegocandido.herokuapp.com/postagens');
    const data = await response.json();
    return data;
}

async function carousel(){
    const postagens = await getPostagens();
    const carousel = document.querySelector('#carousel-inner');
    let count = 0;
    postagens.forEach(postagem => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if(count == 0){
            carouselItem.classList.add('active');
        }
        carouselItem.innerHTML = `
        <a href='post.html?id=${count}' class="stretched-link">
            <img class="d-block w-100 img-fluid" src="https://api-rest-post-diegocandido.herokuapp.com${postagem.thumbImage}" alt="First slide">
            <div class="carousel-caption d-none d-md-block p-2 rounded" style="background-color: rgba(0, 0, 0, 0.7);">
                <h5>${postagem.title}</h5>
                <p>${postagem.description}</p>
            </div>
        </a>
        `;
        carousel.appendChild(carouselItem);
        count++;
    });
}

async function postagens(){
    const postagens = await getPostagens();
    const postagensContainer = document.querySelector('#postagens');
    console.log(postagens);
    console.log(postagens.length)
    let i=0;
    do{
        const postagemRow = document.createElement('div');
        postagemRow.classList.add('row');
        postagemRow.classList.add('mb-2');

        for(let a=0; a<2; a++){
            const postagemCol = document.createElement('div');
            postagemCol.classList.add('col-md-6');
            postagemCol.innerHTML = `
                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative post">
                    <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-primary">${postagens[i].thumbImageAltText}</strong>
                    <h3 class="mb-0">${postagens[i].title}</h3>
                    <div class="mb-1 text-muted">${postagens[i].postDate}</div>
                    <p class="card-text mb-auto">${postagens[i].description}</p>
                    <a href='post.html?id=${i}' class="stretched-link">Continue lendo</a>
                    </div>
                    <div class="col-auto d-none d-lg-block">
                        <img src="https://api-rest-post-diegocandido.herokuapp.com${postagens[i].thumbImage}" alt="${postagens[i].thumbImageAltText}" class="img-fluid rounded" style="width: 200px; height: 250px;">
                    </div>
                </div>
            `;
            postagemRow.appendChild(postagemCol);
            i++;
        }
        postagensContainer.appendChild(postagemRow);
    }while(i<postagens.length)
}

async function openPostagem(id) {
    const postagem = await getPostagem(id);
    const url = `post.html?id=${id}`; // Substitua URL_DA_PAGINA_EXTERNAL pela URL real da página externa
    window.open(url, '_blank');
}

carousel();
postagens();