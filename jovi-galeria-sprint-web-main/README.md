# Jovi Gallery — Enterprise Edition | Sprint Web

Repositório oficial do MVP desenvolvido para a entrega da Sprint de Web Development do curso de **Engenharia de Software da FIAP** (1º Ano - 2º Semestre).

---

##  Sobre o Projeto
O **Jovi Gallery** é um gerenciador inteligente de mídia e conteúdo voltado para o ecossistema corporativo/pessoal. O sistema foi projetado para simular um produto mínimo viável (MVP) real, aplicando conceitos modernos de desenvolvimento frontend, componentização, persistência de dados local e tratamentos lógicos exigidos na engenharia de software acadêmica.

---

##  Tecnologias e Ferramentas Utilizadas
O projeto foi construído utilizando uma stack moderna alinhada ao mercado de desenvolvimento web:

* **React (Vite):** Biblioteca principal utilizada para a construção baseada em componentes reutilizáveis e reatividade de estado (`useState`, `useEffect`).
* **JavaScript (ES6+):** Linguagem base para toda a lógica de negócio, manipulação de arrays e eventos.
* **CSS3 Moderno:** Estilização customizada em um arquivo dedicado (`App.css`), utilizando **CSS Variables (`:root`)**, Grid Layout, Flexbox e a fonte tipográfica **Inter** para garantir uma UI/UX limpa, responsiva e de tom corporativo.
* **HTML5 Media APIs:** Suporte nativo para renderização e manipulação dinâmica de elementos de imagem e vídeo (`<video>`, `<img>`).
* **LocalStorage API:** Mecanismo de persistência client-side para salvar o estado de itens ativos, lixeira e logs de atividades mesmo após o refresh da página.
* **Git & GitHub:** Versionamento de código e controle de fluxo de branches.
* **Vercel:** Plataforma de hospedagem e *Continuous Deployment* (CD) para entrega do link de acesso em produção.

---

## ⚙️ Principais Funcionalidades Implementadas
* **Componentização Avançada:** Separação clara de responsabilidades entre componentes (`Header`, `Statistics`, `UploadAndAlbums`, `MediaCard`).
* **Estatísticas Dinâmicas e Uso de `Math`:** O painel calcula em tempo real o total de itens, a proporção de imagens vs. vídeos e utiliza `Math.round()` para exibir a porcentagem exata de conteúdo em vídeo.
* **Sistema de Busca e Filtragem:** Filtro reativo por álbum e termos de pesquisa.
* **Gestão de Privacidade:** Alternância de status entre mídias Públicas e Privadas com badges visuais.
* **Módulo de Comparação Lado a Lado:** Permite selecionar até 2 mídias simultaneamente para análise comparativa.
* **Lixeira com Restauração:** Remoção lógica de itens para a lixeira, com opção de resgate a qualquer momento.
* **Auditoria e Logs:** Registro em tempo real das ações do usuário com carimbo de horário.
* **Exportação de Dados:** Funcionalidade para exportar o inventário completo da galeria em formato `.json`.

---

## Como Executar o Projeto Localmente

Se você quiser clonar e rodar a aplicação na sua máquina, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/yokohamacaio62-afk/jovi-galeria-sprint-web.git](https://github.com/yokohamacaio62-afk/jovi-galeria-sprint-web.git)
