const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const qrcode = require('qrcode');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(process.cwd(),'src','public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/result', (req, res) => {
    const input_text = req.body.text;
    // console.log(input_text);
    qrcode.toDataURL(input_text, (err, src) => {
        res.render('result', {
            qr_code: src,
        });
    });
    
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});