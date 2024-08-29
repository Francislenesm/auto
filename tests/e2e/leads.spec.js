// @ts-check
const { test, expect } = require('@playwright/test');

const {LandingPage} = require('../pages/LandingPage')

let landingPage

test.beforeEach(async ({page})=>{
landingPage = new LandingPage
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Francislene','francislene.fsm@gmail.com')
 
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entratá em contato!'
  await landingPage.toastHaveText(message)

})

test('não deve cadastrar com e-mail invalido', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Francislene','francislene.com')

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entratá em contato!'
  await landingPage.toastHaveText(message)
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('','francislene.fsm@gmail.com')
 
  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

});

test('não deve cadastrar quando o e-mail não é preenchido', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Francislene','')
 
  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

});

test('não deve cadastrar quando não preenche os campos ', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('','')
 
  await expect(page.locator('.alert')).toHaveText([
  'Campo obrigatório',
  'Campo obrigatório'
 ])
});


