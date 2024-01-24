#APP〈〉

## Requisitos funcionais 
✔︎ Deve ser possível se cadastrar 
✔︎ Deve ser possível se autenticar 
✔︎ Deve ser possível obter o perfil de um usuário logado 
✔︎ Deve ser possível obter o número de check-ins realizados pelo usuário logado 
✔︎ Deve ser possível que um usuário obtenha seu histórico de check-ins 
✔︎ Deve ser possível que um usuário busque academias próximas 
✔︎ Deve ser possível que um usuário busque academias pelo nome 
✔︎ Deve ser possível que um usuário realize check-in em uma academia 
✔︎ Deve ser possível validar o check-in de um usuário 
✔︎ Deve ser possível cadastrar uma academia 

## Regras de negócio 
✔︎ O usuário não deve poder se cadastrar com um e-mail duplicado 
✔︎ O usuário não pode fazer dois check-ins no mesmo dia 
✔︎ O usuário não pode fazer check-in se não estiver perto da academia (a pelo menos  cem metros) 
✔︎ O check-in só pode ser validado até vinte minutos após ser criado 
✔︎ O check-in só pode ser validado por administradores 
✔︎ A academia só pode ser cadastrada por administradores 

## Requisitos não-funcionais 
✔︎ A senha do usuário precisa estar criptografada 
✔︎ Os dados da aplicação precisam estar persistidos em um banco PostgreSQL 
✔︎ Todas listas de dados precisam estar paginadas com vinte itens por página 
✔︎ O usuário deve ser identificado por um JSON Web Token 