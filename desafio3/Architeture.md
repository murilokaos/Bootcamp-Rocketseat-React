# O desafio:

- Criar um app com uma estrutura de mapa, que mostra desenvolvedores em determinada região.
- O app deve ter a possibilidade de cadastrar um novo desenvolvedor clicando sobre ele.
- Também deve ter uma área em que seja possível excluir um desenvolvedor do mapa.
- O desenvolvedor deve ser cadastrado apartir do seu nome de usuário do github,
  e os seus dados devem vir da api do github e serem salvos no estado do Redux.

## O que usar?

- React Map GL (biblioteca da Uber para consumir uma api de mapas)
- [MapBox](http://mapbox.com/)
- [Toastify - Lib Para Exibir Mensagens](https://github.com/fkhadra/react-toastify)
- Repositório com exemplo de uso MapBox da [**_Rocketseat_**](https://github.com/Rocketseat/goreact-exemplo-mapbox)

## Fluxo da aplicação:

1. O usuário acessa a aplicação;
2. O usuário clica sobre o mapa para adicionar um novo usuário à posição clicada;
3. Um modal abre sobre a tela com um único campo, o username do Github;
4. A aplicação busca informações como nome e avatar do usuário da API do Github e salva o
   usuário no store do Redux;
5. O usuário adicionado agora aparece no mapa e na lista lateral;
6. Caso o usuário digitado no input for inválido uma mensagem deve ser retornada, assim
   como se tudo ocorrer bem deve ser retornada uma mensagem de sucesso.
7. Deve ser possível excluir usuários da listagem clicando sobre o “x” na sidebar

## Url Api Github:

Usuário: https://api.github.com/users/username

> [Murilo on murilokaos in Github](https://api.github.com/users/murilokaos)

## TODO configs

- [x] Redux
- [x] Reactotron
- [x] Redux-saga
- [x] Api
- [x] Duck Pattern
- [x] MapBox
- [ ] Map GL
