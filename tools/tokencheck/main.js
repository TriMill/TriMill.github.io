const PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----\
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJY0sZ1TmycQ++zp8H9ugOO3aY\
ozTmlFnDZ+eXaEe5mrFKqPfbAIC4Zxl2GQ82Q1K/h2w8yZs0xPn29oFO6k/MsCmE\
hQeW2Sr7wDpF7ex7mV98N0YwD/42Sa/+9PFOfmgFQKoQBdPAj/aI0BWeMllqIZ5Y\
At/hndubspi9FqzKNQIDAQAB\
-----END PUBLIC KEY-----"

document.getElementById("upload").addEventListener("change", event => {
	if(!FileReader) {
		alert("Your browser is too stupid to understand this script, please use a smart one");
		return
	}
	let input = event.target;
	let file = input.files[0];
	if(file) {
		let reader = new FileReader();
		reader.addEventListener("load", () => {
			checkToken(reader.result);
		});
		reader.readAsText(file);
	} 
});

function checkToken(token_text) {
	let parts = token_text.split("\n");
	let json_text = parts[0]; 
	let signature = parts[1];

	try {
		let json = JSON.parse(json_text);

		let sig = new KJUR.crypto.Signature({"alg": "SHA512withRSA"});
		sig.init(PUBLIC_KEY); // signer's certificate
		sig.updateString(json_text);
		let isValid = sig.verify(b64ToHex(signature));
		if(isValid) {

			document.getElementById("success_userid").innerHTML = json.owner;
			document.getElementById("success_tokenid").innerHTML = json.id;
			document.getElementById("success_description").innerHTML = json.description;
			let created = new Date(json.created * 1000);
			let expires = new Date((json.created + json.delta) * 1000);
			let now = new Date();
			document.getElementById("success_created").innerHTML = 
				created.toISOString().replace("T"," ").replace(/\....Z/,"");
			document.getElementById("success_expires").innerHTML =
				expires.toISOString().replace("T"," ").replace(/\....Z/,"");

			if(expires > now) {
				document.getElementById("valid_header").innerHTML = "Token valid!";
			} else {
				document.getElementById("valid_header").innerHTML = "Token expired";
			}

			document.getElementById("valid").hidden = false;
			document.getElementById("invalid").hidden = true;
		} else {
			document.getElementById("valid").hidden = true;
			document.getElementById("invalid").hidden = false;
		}
	} catch(e) {
		document.getElementById("valid").hidden = true;
		document.getElementById("invalid").hidden = false;
	}
}

function b64ToHex(str) {
  const raw = atob(str);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  return result.toUpperCase();
}
