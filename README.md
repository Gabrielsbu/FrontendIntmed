## Aplicação Front-end desenvolvida com Angular 10.
### Sistema de controle de consultas médicas.

### Primeiro precisamos realizar algumas configurações certo?
### Vale ressaltar que estou ultilizando Windows 10 certo?

#### Passo 1) Abra a pasta do projeto em algum terminal, seja ele, PowerShell(Que utilizo no momento), CMD, Terminal do linux.
#### Passo 2) Aberto o projeto no seu terminal, digite o seguinte comando: yarn, ou digite o comando: npm install.
#### Observação) Dado o comando yarn, todas as minhas depêndencias estará prontas para você utiliza-las na sua máquina, isso ocorre por conta da pasta node_modules (Pasta onde fica todas as depêndencias do projeto), ser muito grande, ela é inserida no git ignore, se não ficaria um projeto gigante para disponibilizar para vocês
#### Passo 3) Com isso feito, execute ng serve --o

### Backend:
#### 1) Crie um novo ambiente virtual, execute o seguinte comando: python -m venv "nome do ambiente", ao criar, irei disponibilizar um arquivo chamando Requiriment.txt, nele você encontrará todas as depêndencias necessárias para o projeto funcionar.
#### 2) Dentro do seu ambiente virtual, abra a pasta chamada scripts, (lembrando, dentro de um terminal), e execute o comando: activate, assim sua VENV(Ambiente virtual estará ativo), em seguida, cole o arquivo requiriment.txt dentro da sua VENV, e execute o comando: pip freeze -r requiriments.txt
#### 3) Após isso, tudo certo, dentro da pasta da minha aplicação, execute o comando, python manage.py makemigrations, em seguida, execute: python manage.py migrate para criar seu banco de dados.
#### 4) Você deve criar uma conta na Interface Administrativa para cadastrar, especialidades, médicos e agendas. execute o comando python manage.py createsuperuser e cadastre.
#### 5) Agora com todo nosso ambiente pronto e instalado, execute o comando python manage.py runserver, e finalmente a api estará pronta para ser consumida.