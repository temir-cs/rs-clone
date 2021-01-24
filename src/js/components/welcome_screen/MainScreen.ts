class MainScreen {
  content: { main: {text:string, form:string}, about: {text:string, form:string}, tutorial: {text:string, form:string};};
  textContainer: HTMLElement;
  formContainer: HTMLElement;
  constructor() {
    this.textContainer = document.querySelector('.content__text');
    this.formContainer = document.querySelector('.form__container');
    this.content = {
      main: {
        text: `
          Once upon a time... In a pixel world...
          Жили были не знаю кто, потом напал злодейский злодей и пришло твое время
          спасти от него мир! <span class="content__var"></span>
         `,
        form: `
          <a href="#game" class="form__btn">Погнали!</a>`
      },
      about: {
        text: `
          This is text about our team, the best team ever! We made the best game ever! ... Wherever. `,
        form: `
          <a href="#main" class="form__btn">Закрыть!</a>`,
      },
      tutorial: {
        text: `
          Press <strong>Q-key</strong> to attack, use <strong>Arrows</strong> to move your character.`,
        form: `
          <a href="#main" class="form__btn">Закрыть!</a>`,
      }
    };
  }

  init(type: string):void {
    this.textContainer.innerHTML = this.content[type].text;
    this.formContainer.innerHTML = this.content[type].form;
  }
}

export default MainScreen;
