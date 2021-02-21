# Pixel Tale
Pixel Tale — классический аркадный 2D платформер, реализованный на базе Phaser 3 и Typescript на фронте и nodejs с использованием express-js, knex, winston для создания бэкэнда.

Игра: [тыц](https://rolling-scopes-school.github.io/temir-cs-JS2020Q3/rs-clone)

Статья: [тыц](https://aitzhan.medium.com/%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D0%B5%D1%80-pixel-tale-%D0%BD%D0%B0-phaser-3-f4c12fc4c065)

![screen](https://user-images.githubusercontent.com/70878638/106760559-2645ce00-665e-11eb-81cb-a486bb6864fb.png)
### Как установить / How To Install 

1. Склонируйте репозиторий:
```
git clone https://github.com/temir-cs/rs-clone.git
```
2. Установите зависимости
```
npm install
```
3. Переключитесь на ветку develop
```
git checkout develop
```
4. Запускайте проект локально
```
npm run dev
```

### Использованные технологии

  - Webpack, ESlint, Typescript - как основа
  - Phaser 3 + Tiled + Texture Packer - создание самой игры
  - nodejs, express-js, knex, winston - бэкенд, аутентификация, хранение результатов
  - Magic - потому что без нее никак ;)


### Phaser 3 + Tiled + Texture Packer
- *Phaser 3* — HTML5 фреймворк для создания ярких и впечатляющих браузерных игр как в 2D, так и в 3D, в котором для отображения геймплея активно используется canvas. 
- *Tiled* — редактор тайловых карт для 2-мерных игр. Позволяет сохранить карту в формате JSON, чтение которого легко обеспечивается в Phaser. 
- *Texture Packer* - удобный инструмент для упаковки текстур объектов и анимаций персонажей

### Nodejs и Express
- *Nodejs и Express* - были выбраны, т.к. таковы были техтребования к заданию.
- *Body-parser* — необходимый middleware при обработке входящих запросов
- *Cors* — технология, которая позволяет предоставить веб-страницам доступ к ресурсам другого домена.
- *Knex* — для генерации sql запросов в нашу базу данных (sqlite)
- *Winston* — логгер, логи пишутся в файл, есть функционал по разбитию логов по уровням.
- *dotenv* — штучка, которая позволяет использовать записанные переменные окружения из .env файла и не делиться ими в “социальных сетях git”.
