# Funcionários da Indústria - Frontend

Aplicação **Vue.js 3** que consome a API REST do backend (Spring Boot) para demonstrar, item por item, as operações do exercício de manipulação de funcionários: inserção, remoção, reajuste salarial, agrupamento por função, aniversariantes, ordenação, totais e cálculo de salários mínimos.

## Descrição

A interface é composta por uma única tela com um botão para cada item do exercício (3.1 a 3.12). Ao clicar em um botão, o frontend chama o endpoint correspondente no backend e renderiza o resultado — como tabela de funcionários, resumo por função, valor total ou funcionário mais velho, dependendo do tipo de retorno daquele item.

Também há um botão de **Resetar dados**, que restaura a base ao estado original (com "João" presente e sem o aumento de 10% aplicado), útil para repetir a demonstração do zero sem reiniciar o backend manualmente.

## Stack Tecnológica

| Tecnologia | Finalidade |
|---|---|
| Vue.js 3 (Options API) | Framework principal |
| Vite | Build tool e dev server |
| Vue Router | Roteamento SPA |
| Axios | Cliente HTTP para consumo da API |
| Node.js / npm | Ambiente de execução e gerenciador de pacotes |

## Estrutura do projeto

```
src/
├── router/
│   └── index.js          # Configuração de rotas (rota única para a tela de funcionários)
├── services/
│   └── api.js             # Chamadas HTTP a cada endpoint do backend (um método por item)
├── views/
│   └── Funcionarios.vue   # Tela principal: botões, tabelas e mensagens de resultado
├── App.vue                # Componente raiz (apenas router-view + estilos globais)
├── main.js                # Ponto de entrada da aplicação
└── style.css              # Estilos globais (base do template Vite)
```

## Pré-requisitos

- Node.js 18 ou superior
- npm (instalado junto com o Node.js)
- Backend rodando e acessível em `http://localhost:8080` (ver README do backend)

## Configuração

O endereço base da API é definido em `src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: "http://localhost:8080/api/funcionarios",
});
```

Ajuste a `baseURL` caso o backend esteja rodando em outra porta ou host.

## Como executar do zero

1. Verifique se o Node.js está instalado:
   ```bash
   node -v
   npm -v
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Certifique-se de que o **backend está rodando** e com **CORS habilitado** para a origem `http://localhost:5173`.

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse a aplicação no navegador:
   ```
   http://localhost:5173
   ```

Ao abrir, a tela já executa automaticamente o item **3.1 (Inserir)**, exibindo a tabela inicial de funcionários.

## Build para produção

```bash
npm run build
```

Os arquivos otimizados são gerados na pasta `dist/`, prontos para deploy em qualquer servidor de arquivos estáticos. Para pré-visualizar o build localmente:

```bash
npm run preview
```

## Funcionalidades disponíveis na tela

| Botão | Endpoint | O que exibe |
|---|---|---|
| 🔄 Resetar dados | `POST /resetar` | Restaura a base ao estado original (com João, sem aumento) |
| 3.1 Inserir | `GET /3-1-inserir` | Tabela com todos os funcionários inseridos |
| 3.2 Remover João | `POST /3-2-remover-joao` | Tabela atualizada sem o funcionário "João" |
| 3.3 Imprimir todos | `GET /3-3-todos` | Tabela com todos os funcionários e seus dados formatados |
| 3.4 Aplicar aumento 10% | `POST /3-4-aplicar-aumento` | Tabela com salários reajustados + mensagem de confirmação |
| 3.5 Agrupar (resumo) | `GET /3-5-agrupar-resumo` | Tabela resumida: função → quantidade de funcionários |
| 3.6 Imprimir agrupados | `GET /3-6-agrupados` | Funcionários agrupados por função, cada grupo em sua própria tabela |
| 3.8 Aniversariantes | `GET /3-8-aniversariantes` | Tabela com aniversariantes dos meses 10 e 12 |
| 3.9 Mais velho | `GET /3-9-mais-velho` | Nome e idade do funcionário mais velho |
| 3.10 Ordem alfabética | `GET /3-10-ordenados` | Tabela ordenada alfabeticamente por nome |
| 3.11 Total salários | `GET /3-11-total-salarios` | Valor total de todos os salários somados |
| 3.12 Salários mínimos | `GET /3-12-salarios-minimos` | Tabela: nome → quantidade de salários mínimos recebidos |

## Layout

A interface segue uma paleta em tons de verde, branco e preto:

- Título principal: verde escuro (`#1e4620`) com borda inferior verde média
- Botões de ação: verde (`#3f8f3f`), escurecendo no hover (`#2e6b2e`)
- Botão de reset: destacado em dourado/amarelo (`#b8860b`), para diferenciá-lo das demais ações
- Cabeçalho das tabelas: verde escuro (`#1e4620`) com texto branco
- Linhas alternadas: branco e verde bem claro (`#f4faf4`)
- Hover nas linhas: verde suave (`#e2f3e2`)
- Mensagens de sucesso/informação: fundo verde claro com borda lateral verde
- Mensagens de erro: vermelho (`#b00020`)

## Tratamento de erros

Se o backend não estiver acessível (offline, porta errada ou CORS bloqueado), a tela exibe uma mensagem de erro informando que é necessário verificar se o backend está rodando em `http://localhost:8080`, em vez de travar ou exibir uma tela em branco.