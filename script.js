const contentForm = document.getElementById("contentForm");
    const contentCards = document.getElementById("contentCards");

    // Imagem padrão para documentos que não são imagens
    const documentImagePlaceholder = "https://via.placeholder.com/200x200.png?text=Documento";
    let editIndex = null; // Armazena o índice do card sendo editado

    contentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Obter valores do formulário
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const fileInput = document.getElementById("file");
      const file = fileInput.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          const fileUrl = reader.result;
          const isImage = file.type.startsWith("image/");
          const isAudio = file.type.startsWith("audio/");
          const isVideo = file.type.startsWith("video/");

          let mediaDisplay;
          if (isImage) {
            mediaDisplay = `<img src="${fileUrl}" class="card-img-top" alt="${title}">`;
          } else if (isAudio) {
            mediaDisplay = `
              <audio controls class="card-img-top">
                <source src="${fileUrl}" type="${file.type}">
                Seu navegador não suporta o elemento de áudio.
              </audio>
            `;
          } else if (isVideo) {
            mediaDisplay = `
              <video controls class="card-img-top">
                <source src="${fileUrl}" type="${file.type}">
                Seu navegador não suporta o elemento de vídeo.
              </video>
            `;
          } else {
            mediaDisplay = `<img src="${documentImagePlaceholder}" class="card-img-top" alt="Documento">`;
          }

          if (editIndex !== null) {
            // Editar o card existente
            updateCard(editIndex, title, description, mediaDisplay);
            editIndex = null;
          } else {
            // Criar um novo card
            createCard(title, description, mediaDisplay);
          }

          // Limpar o formulário
          contentForm.reset();
        };

        reader.readAsDataURL(file);
      }
    });

    // Função para criar um card de conteúdo
    function createCard(title, description, mediaDisplay) {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-3";
      card.innerHTML = `
        <div class="card content-card">
          ${mediaDisplay}
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <button class="btn btn-warning btn-sm" onclick="editCard(this)">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deleteCard(this)">Excluir</button>
          </div>
        </div>
      `;
      contentCards.appendChild(card);
    }

    // Função para atualizar um card existente
    function updateCard(index, title, description, mediaDisplay) {
      const card = contentCards.children[index];
      card.querySelector(".card-title").textContent = title;
      card.querySelector(".card-text").textContent = description;
      card.querySelector(".content-card").innerHTML = mediaDisplay + card.querySelector(".card-body").outerHTML; // Atualiza o mediaDisplay
    }

    // Função para editar um card
    function editCard(button) {
      const card = button.closest(".col-md-4");
      editIndex = Array.from(contentCards.children).indexOf(card);

      // Preenche o formulário com as informações do card
      document.getElementById("title").value = card.querySelector(".card-title").textContent;
      document.getElementById("description").value = card.querySelector(".card-text").textContent;
    }

    // Função para excluir um card
    function deleteCard(button) {
      const card = button.closest(".col-md-4");
      contentCards.removeChild(card);
    }