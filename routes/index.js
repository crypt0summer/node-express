var express = require('express');
var router = express.Router();

var aptos = require('aptos');


router.get('/nft-list/:address/:collectionName', async (req, res) => {
  const client = new aptos.AptosClient("https://fullnode.devnet.aptoslabs.com");
  const tokenClient = new aptos.TokenClient(client); // <:!:section_1b

  let holder_address = req.params.address;//'0x516f33eddd97b058868347d215392fd5bf20b223beadcd89ac62628ac7cad6c1';
  let collectionName = req.params.collectionName;

  const promises = [];
  for(i=0; i<15; i++){
    try{
      promises.push(await tokenClient.getTokenData(holder_address, collectionName, i.toString()));
      // console.log(i);
      // const tokenData = await tokenClient.getTokenData(holder_address, collectionName, i.toString());
      // console.log(tokenData.description)
      // tokens.push(tokenData);
  
    }catch (err) {
      console.error(err);
    }
  }
  const resP = await Promise.all(promises);
  // console.log(resP);
  
  res.send(resP);
})



router.get('/get-apt/:address/:fee', async (req, res) => {
  const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
  const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

  const receiver = req.params.address;
  const fee = req.params.fee;


  const faucetClient = new aptos.FaucetClient(NODE_URL, FAUCET_URL); 
  await faucetClient.fundAccount(receiver, fee); //100_000_000 = 1APT

  res.send(true);

});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello World");
});

module.exports = router;
