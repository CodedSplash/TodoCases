import {Popup} from "../ts/interfaces"

class ThemeSettings extends HTMLElement implements Popup {
    shadow: ShadowRoot
    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    public render(): void {
        const style = `
            <style>
                h2 {
                    margin: 0;
                    padding: 0;
                }
            
                .popup {
                    background-color: rgba(0, 0, 0, .5);
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow-x: hidden;
                    overflow-y: auto;
                    z-index: 19;
                  }
                  .popup__body {
                    background-color: #fff;
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    row-gap: 14px;
                    min-width: 500px;
                    min-height: 80px;
                    max-height: 600px;
                    max-width: 600px;
                    overflow-y: auto;
                    overflow-x: hidden;
                    -webkit-box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
                    -moz-box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
                    box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
                    padding: 15px 0;
                  }
                  
                  .popup__head {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 20px;
                  }
                  
                  .popup__title {
                    display: flex;
                    align-items: center;
                  }
                  
                  .popup__content {
                    display: flex;
                    column-gap: 15px;
                    padding: 0 20px;
                    overflow: hidden;
                  }
                  
                  @media (max-width: 520px) {
                    .popup__body {
                        min-width: 290px;
                        max-width: 290px;
                    }
                  }
                  
                  .popup__button-close {
                    background-color: transparent;
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      outline: none;
                      border: none;
                      padding: 6px;
                      border-radius: 4px;
                      transition: .05s ease 0s;
                      z-index: 19;
                  }
                  
                  .popup__button-close:hover {
                    background-color: rgba(0, 0, 0, 0.15);
                  }
            </style>
        `

        this.shadow.innerHTML = `
            <div class="popup">
              <div class="popup__body">
                <div class="popup__head">
                    <h2 class="popup__title">Настройки темы</h2>
                    <button class="popup__button-close">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><style>svg{fill:#000000}</style><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </button>
                </div>
                <div class="popup__content">
                    <theme-item theme-name="dark"></theme-item>
                    <theme-item theme-name="white"></theme-item>
                    <theme-item theme-name="blue"></theme-item>
                    <theme-item theme-name="red"></theme-item>
                </div>
              </div>
            </div>
        `
    }

    public connectedCallback(): void {
        this.render()
    }
}

customElements.define('theme-settings', ThemeSettings)