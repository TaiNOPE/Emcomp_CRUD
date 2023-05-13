# Teste para a equipe de projetos (EMCOMP)
Projeto criado para o processo seletivo da EMCOMP, no qual deveria ser feito um CRUD de um site de locadora.

Administradores podem criar, excluir e alterar dados de contas, inclusive os seus próprios.

O site usa o localStorage do navegador para salvar os dados.

O site possui um usuário de administrador hard coded (CPF: "admin", Senha: "admin"), num sistema real issi não é aceitável, mas aqui isso existe para meios de demonstração.

Página principal atualmente contém um placeholder, onde depois será implementado algo (pfv leva na zueira, realmente n deu tempo  kkkk).


## Como funciona
Administradores podem criar, alterar e excluir dados cadastrais na página "Gerênciar cadastros".
Usuários podem entrar no site usando CPF e Senha das contas cadastradas por administradores.

Na página de login, é possível entar com contas registradas por administradores, e a conta hard coded (admin).

Caso exista algum registro com o login e senha informados, pode acontecer uma entre duas coisas:

1. Caso o tipo de conta for "user", o usuário é redirecionado para a página principal.

2. Caso o tipo de conta for "admin", o usuário é redirecionado para a página de gerência de contas.



## ToDo
- Página principal.
- Implementar funcionalidade do checkbox "Manter-me conectado" na página de login.
- Corrigir bug na animação do campo "Senha" na parte de edição na página de gerência de cadastros.
- Isolar páginas em arquivos separados.
- Melhorar sistema de armazenamento de contas.


## Problemas já detectados.
Coisas que não tive tempo de corrigir.
- Muitas conversões desnecessárias de JSON.
- Melhor isolação das funções (uma função deve fazer uma coisa e retornar o resultado, por enquano tem muitas funções chamando outras funções, que chamam outras funções... meio q se uma função quebrar, pode vir a quebrar outras).
- Permitir o acesso da página de gerência de registros apenas para contas logadas de administrador.
- Melhorar nomeamento de funções.
- Melhorar nomeamento de classes e IDs no CSS.
- Tive problema com cloneNode() pra copiar o conteúdo do template, por não conseguir colocar eventListeners. Consegui outro jeito de colocar eventListeners, mas ainda n sei se é o melhor jeito.
