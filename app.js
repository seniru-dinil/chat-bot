const input = document.getElementById("input");
const wrapper = document.getElementById("wrapper");

const myFunction = () => {
  let val = input.value;

  wrapper.innerHTML += `        
          <div class="msg-bg">
            <h3 class="left" >${val}</h3>
          </div>       
        `;
  input.value = "";
  newFunction(val);
};

function newFunction(val) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: ` ${val}`,
          },
        ],
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD0AD762kyGFwCh0EgH6tx1SpWRVGQfuFg",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result.candidates[0].content["parts"][0].text)
    .then(
      (res) =>
        (document.getElementById("wrapper").innerHTML += `
      <div class="msg-bg">
            <h3 class="right" >${res}</h3>
          </div>  
    `)
    )
    .catch((error) => console.error(error));
  return res;
}
