import { expect } from "@playwright/test"

export class PaymentPage {	

        constructor(page) {
            this.page = page
            this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
            this.discountInput = page.getByPlaceholder('Discount code')
            this.actiavteDiscountButton = page.locator('[data-qa="submit-discount-button"]')
            this.discountActiveMessage= page.locator('[data-qa="discount-active-message"]')
            this.totalValue=page.locator('[data-qa="total-value"]')
            this.discountedValue=page.locator('[data-qa="total-with-discount-value"]')
            this.creditCardOwnerInput = page.getByPlaceholder("Credit card owner")
            this.creditCardNumberInput = page.getByPlaceholder("Credit card number")
            this.creditCardValidUntilInput = page.getByPlaceholder("Valid until")
            this.creditCardCvcInput = page.getByPlaceholder("Credit card CVC")
            this.payButton = page.locator('[data-qa="pay-button"]')


        
    }

    activateDiscount= async ()=>{
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        console.log(code)
        await this.discountInput.waitFor()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)

        expect(await this.discountedValue.isVisible()).toBe(false)
        expect(await this.discountActiveMessage.isVisible()).toBe(false)

        await this.actiavteDiscountButton.waitFor()
        await this.actiavteDiscountButton.click()
        //await this.page.pause()
        //Option 2 for typing 
        //await this.discountInput.focus()
        //await this.page.keyboard.type(code,{delay:1000})
        //expect(await this.discountInput.inputValue()).toBe(code)

        await this.discountActiveMessage.waitFor()

        await this.discountedValue.waitFor()
        const discountedValueText = await this.discountedValue.innerText()
        const discountedValueTString =discountedValueText.replace("$","")
        const discountValueNumber = parseInt(discountedValueTString,10)
         

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueNumberString =totalValueText.replace("$","")
        const totalValueNumber = parseInt(totalValueNumberString,10)


        expect(discountValueNumber).toBeLessThan(totalValueNumber)

        //await this.page.pause()
    }
    fillPaymentDetails = async (paymentDetails) => {
        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(paymentDetails.owner)
        await this.creditCardNumberInput.waitFor()
        await this.creditCardNumberInput.fill(paymentDetails.number)
        await this.creditCardValidUntilInput.waitFor()
        await this.creditCardValidUntilInput.fill(paymentDetails.validUntil)
        await this.creditCardCvcInput.waitFor()
        await this.creditCardCvcInput.fill(paymentDetails.cvc)
       // await this.page.pause()
    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, { timeout: 3000 })
    }	    
}