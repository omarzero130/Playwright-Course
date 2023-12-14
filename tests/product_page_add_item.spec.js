import { test ,expect} from "@playwright/test"

test.skip("Testt", async({page})=>{
    await page.goto("/")
   const addtoBasketButton= page.locator('[data-qa="product-button"]').first()
   const basketCounter =page.locator('[data-qa="header-basket-count"]')

   await addtoBasketButton.waitFor()

   await expect(addtoBasketButton).toHaveText("Add to Basket")
   await expect(basketCounter).toHaveText("0")

   await addtoBasketButton.click()

   await expect(addtoBasketButton).toHaveText("Remove from Basket")
   await expect(basketCounter).toHaveText("1")


   await page.pause()
});
