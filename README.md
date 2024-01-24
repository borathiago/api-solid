#APP〈〉

## Requisitos funcionais <br />
✔︎ Deve ser possível se cadastrar <br />
✔︎ Deve ser possível se autenticar <br />
✔︎ Deve ser possível obter o perfil de um usuário logado <br />
✔︎ Deve ser possível obter o número de check-ins realizados pelo usuário logado <br />
✔︎ Deve ser possível que um usuário obtenha seu histórico de check-ins <br />
✔︎ Deve ser possível que um usuário busque academias próximas <br />
✔︎ Deve ser possível que um usuário busque academias pelo nome <br />
✔︎ Deve ser possível que um usuário realize check-in em uma academia <br />
✔︎ Deve ser possível validar o check-in de um usuário <br />
✔︎ Deve ser possível cadastrar uma academia <br />

## Regras de negócio <br />
✔︎ O usuário não deve poder se cadastrar com um e-mail duplicado <br />
✔︎ O usuário não pode fazer dois check-ins no mesmo dia <br />
✔︎ O usuário não pode fazer check-in se não estiver perto da academia (a pelo menos  cem metros) <br />
✔︎ O check-in só pode ser validado até vinte minutos após ser criado <br />
✔︎ O check-in só pode ser validado por administradores <br />
✔︎ A academia só pode ser cadastrada por administradores <br />

## Requisitos não-funcionais <br />
✔︎ A senha do usuário precisa estar criptografada <br />
✔︎ Os dados da aplicação precisam estar persistidos em um banco PostgreSQL <br />
✔︎ Todas listas de dados precisam estar paginadas com vinte itens por página <br />
✔︎ O usuário deve ser identificado por um JSON Web Token <br />