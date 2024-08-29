 const {expect} = require('@playwright/test')

export class LandingPage {
constructor(page){
    this.page = page
}
    async visit(){
        await this.page.goto('http://localhost:3000');
        expect.toBeVisible
    }
    async openLeadModal(){
        await this.page.getByRole('button', {name: /Aperte o play/ }).click()

        expect(
         this.page.getByTestId('modal').getByRole('heading')
       ).toHaveText('Fila de espera')
    }
    async submitLeadForm(name,email){
        await this.page.locator('#name').fill(name)
        await this.page.locator('#email').fill(email)
        await this.page.getByRole('button', {name: /Quero entrar na fila!/ }).click()
    }
    async toastHaveText(message){
       
        await expect(this.page.locator('.toast')).toHaveText(message)
        await expect(this.page.locator('.toast')).toBeHidden({timeout: 5000})
    }
}