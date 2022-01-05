
import dotenv from 'dotenv';
dotenv.config();
const Lob = require('lob')(process.env.LOB_API_KEY);
import Check from "../models/check"
/*
 * GET / route to show the createCheck form.
 */
function createCheck(req, res) {
    //catch any response on the url
    let response = req.query.response
    res.render('index', { response })
}


/*
 * POST / route to process the checks.
 */
async function createCheckPost(req, res) {

    const { amount, receiver, sender, memo, date } = req.body
    // Create the bank account
    const bankAccount = await Lob.bankAccounts.create({
        description: 'Test Bank Account',
        routing_number: 322271627,
        account_number: 123456789,
        signatory: 'John Doe',
        account_type: 'company'
    });

    const bankAccountVerification = await Lob.bankAccounts.verify(bankAccount.id, {
        amounts: [25, 63]
    });

    // Create address
    const senderAddress = await Lob.addresses.create({
        name: 'Robin Joseph',
        email: 'test@gmail.com',
        phone: '123456789',
        address_line1: '210 King St',
        address_city: 'San Francisco',
        address_state: 'CA',
        address_zip: '94107',
        address_country: 'US'
    })

    Lob.checks.create({
        description: 'My First Check',
        bank_account: bankAccount.id,
        to: {
            name: receiver,
            address_line1: '220 South Michigan Avenue',
            address_city: 'Chicago',
            address_state: 'IL',
            address_zip: '60604',
            address_country: 'US'
        },
        from: senderAddress.id,
        amount: amount,
        memo: memo,
        logo: 'https://s3-us-west-2.amazonaws.com/public.lob.com/assets/check_logo.png',
        check_bottom: '<h1 style="padding-top:4in;">Demo Check for {{sender}} to {{receiver}}</h1>',
        merge_variables: {
            sender: sender,
            receiver: receiver
        },
        // send_date: date
    })
        .then((check) => {

            const { id, ...otherProperties } = check;
            Check.create({ checkId: id, ...otherProperties })
            res.redirect('/?response=Your check was successfully sent')
        })
        .catch((err) => {
            console.log(err);
        });

}


/*
 * GET / route to get created checks.
 */
function getChecks(req, res) {

    Lob.checks.list({ limit: 50 }, function (err, response) {
        const checks = response.data
        res.render('checks', { checks })
    });

}

/*
 * GET / route to get a check.
 */
function getACheck(req, res) {
    const checkId = req.params.checkId
    Lob.checks.retrieve(checkId, function (err, response) {
        const check = response
        res.render('check', { check })
    });

}

/*
 * GET / route to cancel a cheque.
 */
function cancelACheck(req, res) {
    const checkId = req.params.checkId
    Lob.checks.delete(checkId, function (err, response) {
        const check = response
        res.render('check', { check })
    });
}

//export all the functions
module.exports = { createCheck, createCheckPost, getChecks, getACheck, cancelACheck };
