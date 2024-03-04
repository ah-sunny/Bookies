console.log('connected')
const loadData = async(searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const dataObject = await res.json();
    const data = dataObject.posts;
   showData(data);
    
}

const showData =(data) =>{
  const toggleSpinner = document.getElementById('toggle_spinner');
  toggleSpinner.classList.add('hidden');

    const postContainer = document.getElementById('post_container');
    let postNmber = -1;
    postContainer.innerText = ``;
    data.forEach(post => {
        postNmber++;

        //post details
        const postDiv = document.createElement('div');
        postDiv.classList = `flex gap-4 hover:bg-[#797DFC1A] p-3 lg:p-7 rounded-3xl border-2 border-[#797DFC]`;
        postDiv.innerHTML = `
        <div class="w-[20%] ">
          
          <div class="indicator">
            <span class="indicator-item badge ${data[postNmber]?.isActive?"bg-green-900":"bg-red-700"}"></span>
            <div class="grid w-12 lg:w-24 h-12 lg:h-24 rounded-2xl bg-base-300 place-items-center">
              <img class="rounded-2xl" src="${data[postNmber]?.image}" />
            </div>
          </div>
        </div>
        <div class="space-y-5">
          <div class="flex gap-5">
            <p>#${data[postNmber]?.category}</p>
            <p>Author : ${data[postNmber]?.author?.name}</p>
          </div>
          <div class="space-y-2 border-b-2 border-dashed pb-4">
            <h1 class="text-xl font-bold">${data[postNmber]?.title}</h1>
            <p class="text-slate-500"> ${data[postNmber]?.description}</p>
          </div>
          <!-- icon -->
          <div class="flex justify-between">
            <div class="flex flex-row gap-4 lg:gap-12">
              <div class="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>

                <p>${data[postNmber]?.comment_count}</p>
              </div>
              <div class="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                <p>${data[postNmber]?.view_count}</p>
              </div>
              <div class="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <p>${data[postNmber]?.posted_time}</p>
              </div>

            </div>
            
            <button onclick="handleSelectPost(${data[postNmber]?.id})">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-9 h-9 bg-green-700 rounded-full p-2 text-white ">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
              </svg>
            </button>
          
          </div>
        </div>
        `;

        postContainer.appendChild(postDiv);
        
    });

}

//handleSelectPost()
const handleSelectPost = async(idValue)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    const seletedPostObject = await res.json();
    const seletedPostArray = seletedPostObject.posts;
    handleSelectPostFunction(seletedPostArray,idValue);

}
const handleSelectPostFunction = (seletedPostArray,idValue)=>{
  const seletedPost = seletedPostArray.find(({id}) => id === idValue);

  const selectPostContainer = document.getElementById('Selected_container');
  const countElement = document.getElementById('count_part');
  const counttext = countElement.innerText;
  const countNumber = parseInt(counttext)
  const countPost = countNumber + 1;
  countElement.innerText = countPost;

  const selectNewDiv = document.createElement('div');
  selectNewDiv.classList = `bg-white rounded-xl p-4 flex justify-between`;
  selectNewDiv.innerHTML = `
  <div class="font-bold text-base">
  <p>${seletedPost.title}</p>
</div>
<div class="flex gap-3">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
  <p>${seletedPost.view_count}</p>
</div>
  `;

  selectPostContainer.appendChild(selectNewDiv);

}



//latest post 
const latestPost = async()=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const latestData = await res.json();
    showLatestData(latestData);

}

const showLatestData =(latestData)=>{
  const latestContainer = document.getElementById('latest_container');
  let latestPostNumber = -1;
  latestData.forEach(latestPost => {
    //console.log(latestData[latestPostNumber]);
    latestPostNumber++;

    //create
    const latestDiv = document.createElement('div');
    latestDiv.classList = `card bg-base-100 shadow-xl`;
    latestDiv.innerHTML =`
    <figure class="px-4 pt-4">
    <img src="${latestData[latestPostNumber]?.cover_image}" alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body space-y-2 text-left">

    <div class="flex gap-2 text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-4 h-5">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
      </svg>
      <p>${latestData[latestPostNumber]?.author?.posted_date || `No publish date`} </p>
    </div>
    <h2 class="font-extrabold">${latestData[latestPostNumber]?.title}</h2>
    <p class="text-sm">${latestData[latestPostNumber]?.description}</p>

    <div class="flex gap-4">
      <div class="avatar">
        <div class="w-10 rounded-full">
          <img src="${latestData[latestPostNumber]?.profile_image}" />
        </div>
      </div>

      <div class="text-sm">
        <h1 class="font-bold">${latestData[latestPostNumber]?.author?.name || `unknown name`}</h1>
        <p>${latestData[latestPostNumber]?.author?.designation || `unknown`}</p>
      </div>
    </div>
  </div>
    `;

    latestContainer.appendChild(latestDiv);
    
  });

}

latestPost();


//search handle 
const searchHandle = ()=>{
  const inputElement = document.getElementById('category_input');
  const inputText= inputElement.value;

  const toggleSpinner = document.getElementById('toggle_spinner');
  toggleSpinner.classList.remove('hidden')
  setTimeout(()=>{
    loadData(inputText);
  },2000)


}

