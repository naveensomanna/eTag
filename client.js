

function getResource() {
  const url = "http://localhost:3000";


  const storeETag = localStorage.getItem("etag")

  const options = {
    method: "GET",
    headers: {}
  }


  if (storeETag) {
    options.headers["If-None-Match"] = storeETag;
  }


  fetch(url).then((res) => {
    if (res.status === 304) {
      console.log("Resource not modified ")
    } else {
      res.json().then((result) => {
        console.log(result)
        const newETag = res.headers.get("ETag")
        localStorage.setItem("etag", newETag);
      })
    }
  })

}

getResource();
