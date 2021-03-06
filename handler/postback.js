//module
const pilihOrganisasi = require("../module/pilihOrganisasi");
const listNotOrganisasi = require("../module/listNotOrganisasi");
const hapusBarang = require("../module/hapusBarang");

async function handlePostback(Context) {
  let profileUser = await Context.getUserProfile()
  let userId = profileUser.userId;

  console.log(Context.event.postback)
  const data = Context.event.postback.data.split('=')
  let id_organisasi
  switch (data[0]) {
    case 'organisasi':
      id_organisasi = data[1]
      await pilihOrganisasi(id_organisasi, userId, Context, status = 'admin')
      break;
    case 'listOrganisasi':
      await listNotOrganisasi(Context, userId)
      break;
    case 'joinOrganisasi':
      id_organisasi = data[1]
      await pilihOrganisasi(id_organisasi, userId, Context, status = 'other')
      break;  
    case 'hapus':
      const id_barang = data[1]
      await hapusBarang(id_barang, userId, Context)
      break;
    default:
      console.log('gatau')
      break;
  }
}

module.exports = {
  handlePostback,
}
