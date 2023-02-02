var express = require('express');
var router = express.Router();

var aptos = require('aptos');

//지갑알아야됨 //
router.get('/nft-list/:address/:collectionName', async (req, res) => {
  const client = new aptos.AptosClient("https://fullnode.devnet.aptoslabs.com");
  const tokenClient = new aptos.TokenClient(client); // <:!:section_1b

  let holder_address = req.params.address;//'0x516f33eddd97b058868347d215392fd5bf20b223beadcd89ac62628ac7cad6c1';
  let collectionName = req.params.collectionName;
  let tokens=[];
  for(i=0; i<10; i++){
    try{
      const tokenData = await tokenClient.getTokenData(holder_address, collectionName, i.toString());
      // console.log(tokenData.description)
      tokens.push(tokenData);
  
    }catch (err) {
      // console.error(err);
    }
  }
  
  // console.log(tokens);
  
  res.send(tokens);
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello World");
});

module.exports = router;
