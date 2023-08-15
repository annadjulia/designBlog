async function getPostagens() {
    const response = await fetch('https://api-rest-post-diegocandido.herokuapp.com/postagens');
    const data = await response.json();
    return data;
}

async function getPostagem(id) {
    const response = await fetch(`https://api-rest-post-diegocandido.herokuapp.com/postagem/${id}`);
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
            <img class="d-block w-100 img-fluid" src="https://api-rest-post-diegocandido.herokuapp.com${postagem.thumbImage}" alt="First slide">
            <div class="carousel-caption d-none d-md-block p-2 rounded" style="background-color: rgba(0, 0, 0, 0.7);">
                <h5>${postagem.title}</h5>
                <p>${postagem.description}</p>
            </div>
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
        const cardContainer = createElementWithClass("div", "col-md-6");
        const card = createElementWithClass("div", "row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative");
        
        const textContainer = createElementWithClass("div", "col p-4 d-flex flex-column position-static");
        textContainer.appendChild(createElementWithClass("strong", "d-inline-block mb-2", category));
        textContainer.appendChild(createElementWithClass("h3", "mb-0", title));
        textContainer.appendChild(createElementWithClass("div", "mb-1 text-muted", date));
        textContainer.appendChild(createElementWithClass("p", "card-text mb-auto", content));
        
        const link = createElementWithClass("a", "stretched-link");
        link.href = "#";
        link.textContent = "Continue lendo";
        textContainer.appendChild(link);
        
        const imageContainer = createElementWithClass("div", "col-auto d-none d-lg-block");
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "bd-placeholder-img");
        svg.setAttribute("width", "200");
        svg.setAttribute("height", "250");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", "Placeholder: Thumbnail");
        svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
        svg.setAttribute("focusable", "false");
        svg.innerHTML = '<rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>';
        imageContainer.appendChild(svg);
        
        card.appendChild(textContainer);
        card.appendChild(imageContainer);
        cardContainer.appendChild(card);
      
      
      // Adicionar os cards ao documento
      const row = createElementWithClass("div", "row mb-2");
      row.appendChild(createCard("Featured post", "World", "Nov 12", "This is a wider card with supporting text below as a natural lead-in to additional content."));
      row.appendChild(createCard("Post title", "Design", "Nov 11", "This is a wider card with supporting text below as a natural lead-in to additional content."));
      document.body.appendChild(row);
        for(let a=0; a<2; a++){
            const postagemCol = document.createElement('div');
            postagemCol.classList.add('col-md-6');
        }
    }while(i<postagens.length)

    postagens.forEach(postagem => {
        const postagemCard = document.createElement('div');
        postagemCard.classList.add('col-md-4');
        postagemCard.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" src="https://api-rest-post-diegocandido.herokuapp.com${postagem.thumbImage}" alt="Card image cap">
                <div class="card-body">


       ` 
        postagensContainer.appendChild(postagemCard);

    })

}

carousel();
postagens();