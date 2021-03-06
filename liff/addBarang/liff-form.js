window.onload = function () {
  let myLiffId = "1654371439-eAkgWOEp"
  initializeLiff(myLiffId)
}

/**
 * Initialize LIFF
 * @param {string} myLiffId The LIFF ID of the selected element
 */
function initializeLiff(myLiffId) {
  liff
    .init({
      liffId: myLiffId,
    })
    .then(async () => {
      await getProfile()
      const profile = liff.getContext()
      const userId = profile.userId
      let data = { userId: userId }
      axios({
        url: "https://rpl-inventory.herokuapp.com/api/lineBot?userId=" + userId,
        method: "GET",
      })
        .then((dataToken) => {
          $('body').on('submit' , '#formDetails', e => {
              e.preventDefault()
              let data = {}
              data.nama = document.getElementById("inputNama").value
              data.tgl_produksi = document.getElementById("inputTglProduksi").value
              data.deskripsi = document.getElementById("inputDeskripsi").value
              data.value = document.getElementById("inputValue").value
              data.id_organisasi = dataToken.data.data.id_organisasi
              data.id_kategori = Number(1)
              axios({
                url: "https://rpl-inventory.herokuapp.com/api/barang/add",
                method: "POST",
                headers: {
                  Authorization: `Bearer ${dataToken.data.data.token}`,
                },
                data: data,
              })
                .then(async (response) => {
                  if (response.data.success) {
                    liff
                      .sendMessages([
                        {
                          type: "text",
                          text: "Lihat Barang",
                        },
                      ])
                      .then(() => {
                        console.log("message sent")
                        liff.closeWindow()
                      })
                      .catch((err5) => {
                        alert(err5)
                      })
                  } else {
                    liff
                      .sendMessages([
                        {
                          type: "text",
                          text: "Error...",
                        },
                        {
                          type: "text",
                          text: response.data.message,
                        },
                      ])
                      .then(() => {
                        console.log("message sent")
                        liff.closeWindow()
                      })
                      .catch((err4) => {
                        alert(err4)
                      })
                  }
                })
                .catch((err2) => {
                  liff
                    .sendMessages([
                      {
                        type: "text",
                        text: "Error...",
                      },
                      {
                        type: "text",
                        text: err2.response.data.message,
                      },
                    ])
                    .then(() => {
                      console.log("message sent")
                      liff.closeWindow()
                    })
                    .catch((err3) => {
                      alert(err3)
                    })
                })
            })
        })
        .catch((err0) => {
          liff
            .sendMessages([
              {
                type: "text",
                text: "Error...",
              },
              {
                type: "text",
                text: err0.response.data.message,
              },
            ])
            .then(() => {
              console.log("message sent")
              liff.closeWindow()
            })
            .catch((err) => {
              alert(err)
            })
        })
    })
    .catch((err) => {
      window.location = "./form.html"
    })
}

const getProfile = () => {
  liff
    .getProfile()
    .then((profile) => {
      document.getElementById("btnSubmit").style.visibility = "visible"
      document.getElementById("displayNameField").textContent =
        "Hai, " + profile.displayName
      return profile
    })
    .catch((e) => {
      console.log(e)
    })
}
