import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopViewport } from "./../utils/isDesktopViewport.js"


export class ProductsPage{
    constructor (page) {
        this.page = page
        this.addButtons= page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }
 
    visit =async ()=>{
        await this.page.goto("/")
    }


    
    addProductToBasket = async (index)=>{
        const sepcificAddButton = this.addButtons.nth(index)
         await sepcificAddButton.waitFor()
         await expect(sepcificAddButton).toHaveText("Add to Basket")

         const navigation = new Navigation(this.page)

         let basketCountBeforeAdding
        // only desktop viewport
         if(isDesktopViewport(this.page)){
           basketCountBeforeAdding = await navigation.getBasketCount()
         }
       

         await sepcificAddButton.click()

         await expect(sepcificAddButton).toHaveText("Remove from Basket")
            // only desktop viewport
         if(isDesktopViewport(this.page)){
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
            
         }


    } 

    sortByCheapest = async ()=>{
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts()
        //console.log(productTitlesBeforeSorting)
        await this.sortDropdown.selectOption("price-asc")
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts()
        //console.log(productTitlesAfterSorting)
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting)


    }

}