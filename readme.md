# Frontend Gestão de descontos 

## Especificações tecnologicas do projeto

* React 16.8.6;
* React Router 5.0.0;
* Redux 4.0.1;
* Node 10.15.3 (LTS);
* NPM 6.4.1;

## Ambiente de desenvolvimento local 

O ambiente de desenvolvimento, utiliza o docker. Foi criada uma imagem personalizada para o projeto com base na imagem oficial do docker, o mesmo esta dividido em 2 partes:

1. frontend.dockerfile (Utiliza a imagem oficial do node:10.15.3)
1. docker-compose.yml (Utilizado para configurar os serviços)


## Como faço para executar o projeto ?


Primeiro passo instalar o <a href="https://www.docker.com/" target="_blank">docker</a> em sua maquina. 

Caso seja a primeira vez que esteja executando o projeto rode o seguindo comando: **docker-compose build** na raiz do diretorio do projeto. Após o build da imagem execute o seguinte comando **docker-compose up -d**. 

Caso já tenha realizado o build basta executar o comando **docker-compose up -d** na raiz do diretório do projeto.

## Como faço para acessar de fato o local aonde o serviço esta rodando ?

Neste caso será necessário acessar o **bash** do serviço desejado, para isso exaecute o seguinte comando: 

- **docker-compose exec gestao-descontos-frontend bash** 

**Temos o seguinte container**

* gestao-descontos-frontend;

## Estrutura geral do projeto:

- public (pasta que contém a single page da apĺicação por meio do arquivo index.html e outros arquivos pós "bundle do projeto")
- src (pasta que contém de fato as implmentações)
    - assets (possíveis "ativos" do projeto, imagens e css)
    - common (components e containers comuns no projeto)
        - components (components que são utilizados mais de 1 vez no projeto)
        - containers (components que possuem containers utilizados mais de 1 vez no projeto)
    - config (arquivos de configuração do projeto)
    - helpers ("implementações ajudantes", que resolvem questões especificas e são utilizadas em varias partes do projeto)
    - main (configurações e definições iniciais do projeto)
    - pages (aonde de fato ficam as páginas que utilizam os recursos da API)
    - index.js (arquivo inicial do projeto)
    - serviceWorker.js (arquivo para registro de serviços que rodam em background no frontend)
- package.json (arquivos que contém as dependências do projeto)




