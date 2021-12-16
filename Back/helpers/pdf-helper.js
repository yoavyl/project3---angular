// based on this tutorial: https://levelup.gitconnected.com/generating-pdf-in-nodejs-201e8d9fa3d8

const fs = require("fs");
const path = require("path"); 

const cart_item_dal = require("../data-access-layer/item-dal");
const user_dal = require("../data-access-layer/user-dal");
const PDFGenerator = require('pdfkit');
const { object } = require("joi");

async function createPDF (orderObj) {
    // PROMISIFY IT???
    const items = await cart_item_dal.getOpenCartItems(orderObj.CartID);
    const user = await user_dal.getAllUserDetails(orderObj.UserUUID);

    let theOutput = new PDFGenerator;

    // pipe to a writable stream which would save the result into the same directory
    theOutput.pipe(fs.createWriteStream(`Order${orderObj.OrderID}.pdf`));

    // add in a local image and set it to be 250px by 250px
    theOutput.image('./images/shefa.png', { fit: [200,200] })
            .fillColor('#000')
            .fontSize(20)
            .text('INVOICE/RECEIPT', 275, 50, {align: 'right'})
            .fontSize(10)
            .text(`Invoice Number: ${orderObj.OrderID}`, {align: 'right'})
            .text(`Paid with credit card:: ${orderObj.CreditCard}`, {align: 'right'})
            .moveDown()
            .text(`Billing Address:\n ${user[0].firstName} ${user[0].lastName}\n${user[0].street}\n${user[0].city}\nIsrael`, {align: 'right'})
    
        const beginningOfPage = 50
        const endOfPage = 550

    theOutput.moveTo(beginningOfPage,200)
            .lineTo(endOfPage,200)
            .stroke()

    theOutput.x = 50;
    theOutput.y = 230;
    theOutput.fontSize(16)
        .text(`Order no. ${orderObj.OrderID} `, { bold: true,
        underline: true,
        align: 'center'
    })

    const tableTop = 270;
    let tableTop2 = 270;

    theOutput.fontSize(12)
            .text('Item Code', 50, tableTop, {bold: true})
            .text('Item Name', 150, tableTop)
            .text('Quantity', 350, tableTop)
            .text('Total Price', 450, tableTop)

    for (i = 0; i < items.length; i++) {
        const y = tableTop + 15 + (i * 15)

        theOutput.fontSize(10)
            .text(`${items[i].ProductID}`, 50, y, {bold: true})
            .text(`${items[i].ProductName}`, 150, y)
            .text(`${items[i].Quantity}`, 350, y)
            .text(`${items[i].TotalPrice} NIS`, 450, y)

        tableTop2 = y;
    }
        tableTop2+=30;    

    theOutput.moveDown()
            .fontSize(12)
            .text(`Total amount:`, 350, tableTop2, {bold: true})
            .text(`${orderObj.TotalPrice} NIS`, 450, tableTop2)
    theOutput.x = 50;
    theOutput.moveDown().fontSize(10)
            .text(`Delivery address: ${orderObj.City}, ${orderObj.Street}`)
            .moveDown()
            .text(`Delivery date: ${orderObj.Delivery}`)
    theOutput.end()

    const fileName = `Order${orderObj.OrderID}.pdf`;
    const currentPath = path.join(__dirname, "..", fileName);
    const destinationPath =  path.join(__dirname, "..", "database", "orders", fileName)

    fs.rename(currentPath, destinationPath, function (err) {
        if (err) {
            throw err
        } else {
            console.log("Successfully moved the file!");
        }
    });
}

module.exports = {
    createPDF,
}