// 1. URL do arquivo JSON (Deve estar na mesma pasta ou caminho relativo correto)
const JSON_URL = 'conteudo.json'; 

// 2. Função principal para carregar e renderizar os dados
async function loadLactaData() {
    try {
        // Tenta buscar o JSON
        const response = await fetch(JSON_URL);
        
        // Verifica se a resposta HTTP foi bem-sucedida (status ok = 200-299)
        if (!response.ok) {
            // Se houver erro de carregamento (404 Not Found, etc.)
            throw new Error(`Erro HTTP! Status: ${response.status}. Verifique o nome do arquivo JSON.`);
        }
        
        // Converte a resposta para JSON
        const data = await response.json();
        
        // Renderiza as seções com os dados
        renderHero(data.produto);
        renderBombons(data.bombons);

    } catch (error) {
        console.error("Não foi possível carregar os dados:", error);
        
        // Feedback visual no HTML
        const productName = document.getElementById('product-name');
        if (productName) {
            productName.textContent = 'Erro ao carregar dados. Use Live Server!';
            productName.style.color = '#B3001B';
        }
    }
}

// 3. Função para renderizar a seção Hero
function renderHero(produto) {
    const productName = document.getElementById('product-name');
    const priceOriginal = document.getElementById('price-original');
    const priceOferta = document.getElementById('price-oferta');
    
    // Atualiza o conteúdo, se os elementos existirem
    if (productName) productName.textContent = produto.nome;
    if (priceOriginal) priceOriginal.textContent = `De ${produto.preco_original}`;
    if (priceOferta) priceOferta.textContent = produto.preco_oferta;
}

// 4. Função para renderizar a lista de bombons
function renderBombons(bombons) {
    const listContainer = document.getElementById('bombons-list');
    if (!listContainer) return;

    listContainer.innerHTML = ''; // Limpa o conteúdo
    
    bombons.forEach(bombom => {
        const card = document.createElement('div');
        card.classList.add('bombom-card');
        
        // Define a cor da borda esquerda baseada no JSON
        card.style.borderLeftColor = bombom.icone_cor;

        // Conteúdo do card, incluindo a imagem
        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${bombom.imagem_url}" alt="${bombom.nome}" class="bombom-img">
            </div>
            <h4>${bombom.nome}</h4>
            <p>${bombom.sabor}</p>
        `;
        
        listContainer.appendChild(card);
    });
}

// Inicializa a aplicação ao carregar a página
document.addEventListener('DOMContentLoaded', loadLactaData);