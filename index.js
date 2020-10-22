import express from 'express';
import { promises as fs} from 'fs';
import shortid from 'shortid';


const app = express();

const { readFile, writeFile } = fs;

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded( {extended: false }))

app.get("/", async (req, res) => {
    res.render('index', { shortUrls: data.Urls, urlServer: req.url});
})

app.get("/shortUrl", async (req, res) => {
    res.send(data);
})

app.post("/", async (req, res) => {
    try{
        const { addr } = req.body;
        const findIndex = data.Urls.filter(url => (url.addr === addr))
        if(findIndex.length < 1){
            let Url = {
                id: data.NextId++,
                shortUrl: `${shortid.generate()}`,
                addr: addr,
                numAccess: 0,
            };
        
            data.Urls.push(Url);
        
            await writeFile('./db/bancoUrl.json', JSON.stringify(data,null,2))
            res.redirect("http://localhost:8081")
            
        }else{
            res.send("O link enviado já esta cadastrado no banco de dados")
        }        

    }catch(err){
        console.log(err.message)
    }
})

app.get("/:shortUrl", async (req,res)=>{
    
    const findIndex = data.Urls.filter(url => (url.shortUrl === req.params.shortUrl));
    if(findIndex < 1) return res.sendStatus(404);
    findIndex[0].numAccess++;

    await writeFile('./db/bancoUrl.json', JSON.stringify(data,null,2));
    res.redirect(findIndex[0].addr);

});


app.listen(8081, async () => {
    console.log("Subiu o APP")
    global.data = JSON.parse(await readFile('./db/bancoUrl.json'));
    try{
        await fs.open('./db/bancoUrl.json');
    }catch(err){
        console.log(err.message)
    }

})